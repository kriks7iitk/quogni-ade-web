import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Session, AuthType } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { SessionCreate } from "./interface/sesssion.interface";
import { ConfigService } from "@nestjs/config";
import { createError } from "@/utility/helpers";
import { AUTH_ERROR_CODE } from "../auth/constants/error-codes";
import { AUTH_ERROR_MESSAGE } from "../auth/constants/error-messages";

@Injectable()
export class SessionService {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async create(
    createObject: SessionCreate,
    client?: PrismaService
  ): Promise<Session> {
    return await this.prisma.withTransaction(async (client: PrismaService) => {
      return await client.session.create({
        data: {
          ip: createObject?.ip,
          expiringTime: this.getExpirationTime(),
          userId: createObject?.userId,
          authType: createObject?.authType ?? AuthType.LOCAL,
        },
        // data: {
        //   ip: createObject?.ip,
        //   expiringTime: this.getExpirationTime(),
        //   userId: createObject?.userId,
        // },
      });
    }, client);
  }

  async get(id: number, client?: PrismaService): Promise<Session> {
    return await this.prisma.withTransaction(async (client: PrismaService) => {
      return await client.session.findUnique({
        where: {
          id,
        },
      });
    }, client);
  }

  async updateExpiry(id: number, client?: PrismaService): Promise<Session> {
    return await this.prisma.withTransaction(async (client: PrismaService) => {
      return await client.session.update({
        where: {
          id,
        },
        data: {
          expiringTime: this.getExpirationTime(),
        },
      });
    }, client);
  }
  async validateSession(id: number, client?: PrismaService): Promise<boolean> {
    return await this.prisma.withTransaction(async (client: PrismaService) => {
      const session = await this.get(id, client);
      const currentDate = new Date();
      console.log("running validate session");
      if (!session) return false;
      if (session.expiringTime < currentDate) {
        await this.terminate(session, client);
        throw new UnauthorizedException({
          message: {
            ...createError(
              AUTH_ERROR_CODE,
              AUTH_ERROR_MESSAGE,
              "SESSION_EXPIRED"
            ),
          },
        });
      }
      await this.updateExpiry(id, client);
    }, client);
  }

  private async terminate(
    session: Session,
    client: PrismaService
  ): Promise<void> {
    await client.session.delete({
      where: {
        id: session.id,
      },
    });
  }

  private getExpirationTime() {
    const sessionLifeInDays = this.configService.get<number>(
      "SESSION_LIFE_IN_DAYS"
    );
    const currentDate = new Date();
    currentDate.setUTCDate(currentDate.getUTCDate() + sessionLifeInDays);
    return currentDate;
  }
}

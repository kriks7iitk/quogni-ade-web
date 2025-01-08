import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { UserDetails } from "./interfaces/user-details.interface";
import { Prisma } from "@prisma/client";
import { USER_MOD_ERROR_MESSAGE } from "./constants/error-message";
import { USER_MOD_ERROR_CODES } from "./constants/error-codes";

import { JwtService } from "@nestjs/jwt";
import { UpdateUserDto } from "./user.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUserByPhoneNumber(phoneNumber: string) {
    return this.prisma.user.findUnique({
      where: { phoneNumber: phoneNumber },
    });
  }

  async findUserById(id: number) {
    return await this.prisma.withTransaction(async (client: PrismaService) => {
      return client.user.findUnique({
        where: {
          id,
        },
      });
    });
  }

  async createUser(
    { phoneNumber, email }: { phoneNumber?: string; email: string },
    userDetails: Partial<UserDetails>,
    client?: PrismaService
  ) {
    return await this.prisma.withTransaction(async (client: PrismaService) => {
      try {
        return await client.user.create({
          data: {
            phoneNumber: phoneNumber,
            email: email,
            userDetails: {
              create: {
                username: userDetails.username || "",
                dateOfBirth: new Date(userDetails?.dateOfBirth),
                occupation: userDetails?.occupation || "",
                sector: userDetails?.sector || "",
                fullname: userDetails.fullName || "",
              },
            },
          },
        });
      } catch (e) {
        console.log("error is ", e);

        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          console.log(e);

          if (e.code === "P2002") {
            throw new BadRequestException({
              message: {
                error: USER_MOD_ERROR_MESSAGE.USER_EXIST,
                code: USER_MOD_ERROR_CODES.USER_EXIST,
                meta: e?.meta,
              },
            });
          }
        }
        throw new InternalServerErrorException();
      }
    }, client);
  }

  async updateUserDetails(updateUserRequestDto: UpdateUserDto, userId: number) {
    const updateData: Record<string, any> = {};
    delete updateUserRequestDto.isOnboarded;
    const isOnboarded = updateUserRequestDto?.isOnboarded;
    for (const [key, value] of Object.entries(updateUserRequestDto)) {
      if (value !== null && value !== undefined) {
        updateData[key] =
          key == "sector" || key == "occupation"
            ? JSON.stringify(value)
            : value;
      }
    }
    if (updateData?.dateOfBirth) {
      const parsedDate = new Date(updateData.dateOfBirth);
      updateData.dateOfBirth = parsedDate;
    }

    await this.prisma.withTransaction(async (client: PrismaService) => {
      await client.user.update({
        where: { id: userId },
        data: {
          isOnboarded,
          userDetails: {
            update: {
              where: { id: userId },
              data: updateData,
            },
          },
        },
      });
    });
    return;
  }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { UserDetails } from "./interfaces/user-details.interface";
import { AuthType, Prisma } from "@prisma/client";
import { USER_MOD_ERROR_MESSAGE } from "./dto/constants/error-message";
import { USER_MOD_ERROR_CODES } from "./dto/constants/error-codes";

import { JwtService } from "@nestjs/jwt";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ConfigService } from "@nestjs/config";
import { SignUpDto } from "../auth/auth.dto";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

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
        console.log("yo oyy oy");

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
                authType: AuthType.LOCAL,
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

  async updateUserDetails(updateUserRequestDto: UpdateUserDto, token: string) {
    const decoded = this.jwtService.verify(token, {
      secret: this.configService.get<string>("JWT_SECRET"),
    });
    const userId = decoded?.sub;

    const updatedUser = await this.prisma.oAuthUser.update({
      where: { id: userId },
      data: {
        userDetails: {
          update: {
            where: { id: userId },
            data: {
              authType: updateUserRequestDto.authType,
              username: updateUserRequestDto.username,
              dateOfBirth: updateUserRequestDto.dateOfBirth,
              sector: JSON.stringify(updateUserRequestDto.sector),
              occupation: JSON.stringify(updateUserRequestDto.occupation),
            },
          },
        },
      },
      include: {
        userDetails: true,
      },
    });
    return updatedUser;
  }
}

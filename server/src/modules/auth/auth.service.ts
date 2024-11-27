import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthorizeDto, SendOtpDto, SignUpDto } from "./auth.dto";
import { UserService } from "../user/user.service";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { Prisma, User } from "@prisma/client";
import { AUTH_ERROR_CODE } from "./constants/error-codes";
import { AUTH_ERROR_MESSAGE } from "./constants/error-messages";
import { createError } from "@/utility/helpers";
import { UserPayload } from "./interfaces/auth-interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    return await this.prismaService.withTransaction(
      async (client: PrismaService) => {
        const user = await this.userService.createUser(
          { phoneNumber: signUpDto.phoneNumber, email: signUpDto.email },
          {
            username: signUpDto.username,
            dateOfBirth: signUpDto.dateOfBirth,
            fullName: signUpDto.fullName,
            occupation: signUpDto.occupation,
            sector: signUpDto.sector,
          },
          client
        );
        // const otp = await this.createOtp(client, user.id);
        // await this.sendOTP({ phoneNumber: signUpDto.phoneNumber, otp });
        return user;
      }
    );
  }

  private async createOtp(client: PrismaService, userId) {
    const otp = Math.floor(1000 + Math.random() * 9000);
    await client.userOtp.upsert({
      where: {
        userId: userId,
      },
      update: {
        otp: otp,
        updatedAt: new Date(),
      },
      create: {
        userId: userId,
        otp: otp,
      },
    });
    return otp;
  }

  private async authorize(
    user: Prisma.UserGetPayload<{
      include: { userDetails: true };
    }>
  ) {
    return {
      accessToken: this.jwtService.sign(
        this.generateUserPayload(user, user.userDetails.username)
      ),
    };
  }

  async sendOTP({
    phoneNumber,
    otp,
  }: {
    phoneNumber: string;
    otp: number;
  }): Promise<any> {
    try {
      console.log("hello");
      console.log(this.configService.get("OTP_SEND_URL"));

      const response = await axios.post(
        this.configService.get("OTP_SEND_URL"),
        {
          variables_values: otp,
          route: "otp",
          numbers: phoneNumber.slice(2),
        },
        {
          headers: {
            authorization: this.configService.get("OTP_VERIFICATION_AUTH_KEY"),
          },
        }
      );

      return;
    } catch (error) {
      throw new HttpException(
        `Failed to send SMS: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async verifyPhoneNumberAndAuthorize({ userId, otp }: AuthorizeDto) {
    return await this.prismaService.withTransaction(
      async (client: PrismaService) => {
        const user = (await client.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            userDetails: true,
          },
        })) as Prisma.UserGetPayload<{
          include: { userDetails: true };
        }>;

        if (!user)
          throw new BadRequestException({
            message: {
              ...createError(
                AUTH_ERROR_CODE,
                AUTH_ERROR_MESSAGE,
                "USER_PHONE_NOT_EXIST"
              ),
            },
          });
        await this.verifyOTP({ userId, otp }, client);
        return await this.authorize(user);
      }
    );
  }

  private async verifyOTP(
    {
      userId,
      otp,
    }: {
      userId: number;
      otp: number;
    },
    client?: PrismaService
  ): Promise<void> {
    return await this.prismaService.withTransaction(
      async (client: PrismaService) => {
        const userOtp = await client.userOtp.findUnique({
          where: {
            userId,
          },
        });
        //add OTP time check as welll here
        if (!otp || otp !== userOtp.otp)
          throw new BadRequestException({
            message: {
              ...createError(
                AUTH_ERROR_CODE,
                AUTH_ERROR_MESSAGE,
                "INCORRECT_OTP"
              ),
            },
          });
        await client.userOtp.delete({
          where: {
            id: userOtp.id,
          },
        });
        await client.user.update({
          where: {
            id: userId,
          },
          data: {
            isPhoneVerified: true,
          },
        });
        return;
      },
      client
    );
  }

  async signIn(signInDto: SendOtpDto) {
    return await this.prismaService.withTransaction(
      async (client: PrismaService) => {
        const user = await this.userService.findUserByPhoneNumber(
          signInDto.phoneNumber
        );
        if (!user)
          throw new UnauthorizedException({
            message: {
              ...createError(
                AUTH_ERROR_CODE,
                AUTH_ERROR_MESSAGE,
                "USER_PHONE_NOT_EXIST"
              ),
            },
          });
        const otp = await this.createOtp(client, user.id);
        await this.sendOTP({ phoneNumber: signInDto.phoneNumber, otp });
        return user;
      }
    );
  }

  private generateUserPayload(user: User, username: string): UserPayload {
    return {
      sub: user.id,
      phoneNumber: user.phoneNumber,
      username,
    };
  }
}

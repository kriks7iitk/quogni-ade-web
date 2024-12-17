// user signup
// return token stored in user dta
import { BadRequestException, Injectable } from "@nestjs/common";
import axios from "axios";
import {
  OAuthSignUpDto,
  TokenRequestDto,
} from "./oauth.dto";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
import {
  AuthType,
  OAuthUser,
  OAuthUserProvider,
  Prisma,
  UserDetails,
} from "@prisma/client";
import { CreateOAuthUserObject } from "../auth/interfaces/auth-interface";
import { createError } from "@/utility/helpers";
import { AUTH_ERROR_CODE } from "../auth/constants/error-codes";
import { AUTH_ERROR_MESSAGE } from "../auth/constants/error-messages";
import { UserService } from "../user/user.service";
import { UpdateUserDto } from "../user/dto/update-user.dto";
@Injectable()
export class OAuthService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private prisma: PrismaService
  ) {}

  async get(id: number, client?: PrismaService): Promise<OAuthUser> {
    return await this.prisma.withTransaction(async (client: PrismaService) => {
      return await client.oAuthUser.findUnique({
        where: {
          id,
        },
      });
    }, client);
  }

  async createOAthUserFromRequest(tokenRequestDto: TokenRequestDto) {
    return await this.prisma.withTransaction(async (client: PrismaService) => {
      switch (tokenRequestDto.type) {
        // more modularity
        case OAuthUserProvider.GOOGLE:
          const googleUserData = await this.getGoogleUserInfo(
            tokenRequestDto.code
          );
          const googleUserDetails: Partial<UserDetails> = {
            fullname: googleUserData.name,
          };
          const googleUser = await this.createOAuthUser(
            { type: tokenRequestDto.type, email: googleUserData.email },
            googleUserDetails,
            client
          );                  
          const googleToken = this.authService.authorize({
            user: googleUser,
            ip: "",
            authType: AuthType.OAUTH,
          });
          return googleToken;

        case OAuthUserProvider.LINKEDIN:
          const accessToken = await this.getToken(tokenRequestDto);
          const linkedinUserData = await this.getLinkedinUserInfo(accessToken);
          const linkedinUserDetails: Partial<UserDetails> = {
            fullname: linkedinUserData.name,
          };
          const linkedinUser = await this.createOAuthUser(
            { type: tokenRequestDto.type, email: linkedinUserData.email },
            linkedinUserDetails,
            client
          );
          const linkedinToken = this.authService.authorize({
            user: linkedinUser,
            ip: "",
            authType: AuthType.OAUTH,
          });
          return linkedinToken;

        default:
          throw new Error("Unsupported OAuth type");
      }
    });
  }
  async getToken(tokenRequestDto: TokenRequestDto) {
    switch (tokenRequestDto.type) {
      case OAuthUserProvider.LINKEDIN:
        try {
          const code = tokenRequestDto.code;
          const tokenUrl = "https://www.linkedin.com/oauth/v2/accessToken";
          const params = new URLSearchParams();
          params.append("grant_type", "authorization_code");
          params.append("code", code);
          params.append(
            "redirect_uri",
            `http://localhost:8082/oauth/callback/linkedin`
          );
          params.append("client_id", "862eqspemtvr0p");
          params.append("client_secret", "WPL_AP1.2r9MGgNk8psNnnOY.EBKcUw==");
          const response = await axios.post(tokenUrl, params.toString(), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          });
          return response.data.access_token;
        } catch (err) {
          // error handling TBD
          console.log(err);
        }
      default:
        throw new Error("OAuth type not supported");
    }
  }
  async getGoogleUserInfo(accessToken: string) {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    return response.data;
  }
  async getLinkedinUserInfo(access_token: string) {
    const userUrl = "https://api.linkedin.com/v2/userinfo";
    const response = await axios.get(userUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  }

  private async createOAuthUser(
    oAuthSignUpDto: CreateOAuthUserObject,
    oAuthUserDetails: Partial<UserDetails>,
    client?: PrismaService
  ): Promise<OAuthUser> {
    return await this.prisma.withTransaction(async (client: PrismaService) => {
        if (await this.authService.userExists(oAuthSignUpDto.email) == true) {
          throw new BadRequestException({
            message: {
              ...createError(
                AUTH_ERROR_CODE,
                AUTH_ERROR_MESSAGE,
                "USER_EXISTS"
              ),
            },
          });
        }
        return await client.oAuthUser.create({
          data: {
            type: oAuthSignUpDto.type,
            email: oAuthSignUpDto.email,
            userDetails: {
              create: {
                fullname: oAuthUserDetails.fullname || "",
                authType: AuthType.OAUTH || "OAUTH",
                username: "",
                dateOfBirth: null,
                sector: null,
                occupation: null,
              },
            },
          },
        });
    }, client)
  }

  async updateOAuthUser(updateUserRequest: UpdateUserDto, authToken: string) {
    return this.userService.updateUserDetails(updateUserRequest, authToken);
  }
}
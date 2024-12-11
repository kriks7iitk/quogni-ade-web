// user signup
// return token stored in user dta
import { BadRequestException, Injectable } from "@nestjs/common";
import axios from "axios";
import {
  OAuthSignUpDto,
  TokenRequestDto,
  UpdateUserRequestDto,
} from "./oauth.dto";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
import { AuthType, OAuthUserProvider, Prisma } from "@prisma/client";
import { CreateOAuthUserObject } from "../auth/interfaces/auth-interface";
@Injectable()
export class OAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private prisma: PrismaService
  ) {}

  async createOAthUserFromRequest(tokenRequestDto: TokenRequestDto) {}
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

  async createOAuthUser(
    oAuthSignUpDto: CreateOAuthUserObject,
    oAuthUserDetails
  ) {
    return await this.prisma.withTransaction(async (client: PrismaService) => {
      try {
        if (this.authService.userExists(oAuthSignUpDto.email)) {
          // show error
        }
        return await client.oAuthUser.create({
          data: {
            type: oAuthSignUpDto.type,
            email: oAuthSignUpDto.email,
            userDetails: {
              create: {
                fullname: oAuthUserDetails.fullName || "",
                authType: AuthType.OAUTH,
                username: "",
                dateOfBirth: null,
                sector: null,
                occupation: null,
              },
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    });
  }

  async updateUserDetails(
    updateUserRequestDto: UpdateUserRequestDto,
    token: string
  ) {
    const decoded = this.jwtService.verify(token, {
      secret: "THISISNOTTHESECRET",
    });
    const userId = decoded?.sub;
    // const updatedUser = await this.prisma.oAuthUser.update({
    //   where: { id: userId },
    //   data: {
    //     oAuthUserDetails: {
    //       update: {
    //         username: updateUserRequestDto.username,
    //         dateOfBirth: updateUserRequestDto.dateOfBirth,
    //         sector: JSON.stringify(updateUserRequestDto.sector),
    //         occupation: JSON.stringify(updateUserRequestDto.occupation),
    //       }
    //     }
    //   },
    //   include: {
    //     oAuthUserDetails: true
    //   }
    // });

    return;
  }
}
// user signup
// return token stored in user dta
import {
    BadRequestException,
    Injectable,
  } from "@nestjs/common";
import axios from "axios";
import { TokenRequestDto } from "./oauth.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { createError } from "@/utility/helpers";
import { AUTH_ERROR_CODE } from "../auth/constants/error-codes";
import { AUTH_ERROR_MESSAGE } from "../auth/constants/error-messages";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
  @Injectable()
  export class OAuthService {
    constructor (
        private readonly jwtService: JwtService,
        private readonly authService: AuthService
    ) {}
      async getToken(tokenRequestDto: TokenRequestDto) {
        switch(tokenRequestDto.type) {
            case 'linkedin':
                try {
                const code = tokenRequestDto.code;
                const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
                const params = new URLSearchParams();
                params.append('grant_type', 'authorization_code');
                params.append('code', code);
                params.append('redirect_uri', `http://localhost:8082/oauth/callback/linkedin`);
                params.append('client_id', '862eqspemtvr0p');
                params.append('client_secret', 'WPL_AP1.2r9MGgNk8psNnnOY.EBKcUw==');
                const response = await axios.post(tokenUrl, params.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                });
                return response.data.access_token;
            } catch (err) {
                // error handling TBD
                console.log(err)
            }
            default:
                throw new Error("OAuth type not supported")
        }
      }
      async getGoogleUserInfo(accessToken: string) {   
            const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json'
                }
            })

            return response.data;
      }
      async getLinkedinUserInfo(access_token: string) {
            const userUrl = 'https://api.linkedin.com/v2/userinfo';
          
            const response = await axios.get(userUrl, {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
            });

            return response.data;
      }
      async authorize(client: PrismaService, userId: number) {
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
        return {
            accessToken: this.jwtService.sign(
                this.authService.generateUserPayload(user, user.userDetails.username),
                {
                    secret: "thisisnotthesecret"
                }
            ),
        };
      }
  }
  
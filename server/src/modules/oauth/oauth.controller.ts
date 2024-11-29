import { Controller, Post, Body } from "@nestjs/common";
import { OAuthService } from "./oauth.service";
import { TokenRequestDto  } from "./oauth.dto";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma/prisma.service";
@Controller("oauth")
export class OAuthController {
  constructor(
    private readonly oAuthService: OAuthService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService
  ) {}
  @Post("register")
  async Register(@Body() tokenRequestDto: TokenRequestDto) {
    switch (tokenRequestDto.type) {
        case 'google':
          console.log("hit");
          const googleUserData = await this.oAuthService.getGoogleUserInfo(tokenRequestDto.code);
          // user service
          const userDetails = {
            fullName: googleUserData.name
          }
          const result = await this.userService.createUser({phoneNumber: null, email: googleUserData.email}, userDetails, this.prismaService);
          // authorize
          console.log(result);
          break;
      
        case 'linkedin':
          console.log(tokenRequestDto)
          const accessToken = await this.oAuthService.getToken(tokenRequestDto);
          const linkedinUserData = await this.oAuthService.getLinkedinUserInfo(accessToken);
          // user service
          // authorize
          console.log(linkedinUserData);
          break;
          // return token and add to session in frontend
      
        default:
          console.log(tokenRequestDto);
          throw new Error('Unsupported OAuth type');
      }
  }
}

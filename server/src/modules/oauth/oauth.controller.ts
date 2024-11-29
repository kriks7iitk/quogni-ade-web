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
    private readonly prismaService: PrismaService,
  ) {}
  @Post("register")
  async Register(@Body() tokenRequestDto: TokenRequestDto) {
    switch (tokenRequestDto.type) {
        case 'google':
          const googleUserData = await this.oAuthService.getGoogleUserInfo(tokenRequestDto.code);
          const googleUserDetails = {
            fullName: googleUserData.name
          }
          const googleUser = await this.userService.createUser({phoneNumber: null, email: googleUserData.email}, googleUserDetails, this.prismaService);
          const googleToken = this.oAuthService.authorize(this.prismaService, googleUser.id);
          return googleToken;
      
        case 'linkedin':
          const accessToken = await this.oAuthService.getToken(tokenRequestDto);
          const linkedinUserData = await this.oAuthService.getLinkedinUserInfo(accessToken);
          const linkedinUserDetails = {
            fullName: linkedinUserData.name
          }          
          const linkedinUser = await this.userService.createUser({phoneNumber: null, email: linkedinUserData.email}, linkedinUserDetails, this.prismaService);
          const linkedinToken = this.oAuthService.authorize(this.prismaService, linkedinUser.id);
          return linkedinToken;
      
        default:
          throw new Error('Unsupported OAuth type');
      }
  }
}

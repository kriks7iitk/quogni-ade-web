import { Controller, Post, Body } from "@nestjs/common";
import { OAuthService } from "./oauth.service";
import { TokenRequestDto  } from "./oauth.dto";
import { OAuthUserDetails } from "@prisma/client";

@Controller("oauth")
export class OAuthController {
  constructor(
    private readonly oAuthService: OAuthService,
  ) {}
  @Post("register")
  async Register(@Body() tokenRequestDto: TokenRequestDto) {
    switch (tokenRequestDto.type) {
        // more modularity
        case 'google':
          const googleUserData = await this.oAuthService.getGoogleUserInfo(tokenRequestDto.code);
          const googleUserDetails: Partial<OAuthUserDetails> = {
            fullname: googleUserData.name
          }
          const googleUser = await this.oAuthService.createOAuthUser(
            {type: tokenRequestDto.type, 
            email: googleUserData.email}, 
            googleUserDetails
          );
          const googleToken = this.oAuthService.authorize(googleUser.id);
          return googleToken;
      
        case 'linkedin':
          const accessToken = await this.oAuthService.getToken(tokenRequestDto);
          const linkedinUserData = await this.oAuthService.getLinkedinUserInfo(accessToken);
          const linkedinUserDetails: Partial<OAuthUserDetails> = {
            fullname: linkedinUserData.name
          }          
          const linkedinUser = await this.oAuthService.createOAuthUser(
            {type: tokenRequestDto.type, 
            email: linkedinUserData.email}, 
            linkedinUserDetails
          );
          const linkedinToken = this.oAuthService.authorize(linkedinUser.id);
          return linkedinToken;
      
        default:
          throw new Error('Unsupported OAuth type');
      }
  }
}

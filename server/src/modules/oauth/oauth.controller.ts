import { Controller, Post, Body } from "@nestjs/common";
import { OAuthService } from "./oauth.service";
import { TokenRequestDto  } from "./oauth.dto";
@Controller("oauth")
export class OAuthController {
  constructor(
    private readonly oAuthService: OAuthService
  ) {}
  @Post("register")
  async Register(@Body() tokenRequestDto: TokenRequestDto) {
    switch (tokenRequestDto.type) {
        case 'google':
          console.log("hit");
          const googleUserData = await this.oAuthService.getGoogleUserInfo(tokenRequestDto.code);
          console.log(googleUserData);
          break;
      
        case 'linkedin':
          console.log(tokenRequestDto)
          const accessToken = await this.oAuthService.getToken(tokenRequestDto);
          const linkedinUserData = await this.oAuthService.getLinkedinUserInfo(accessToken);
          console.log(linkedinUserData);
          break;
      
        default:
          console.log(tokenRequestDto);
          throw new Error('Unsupported OAuth type');
      }
  }
}

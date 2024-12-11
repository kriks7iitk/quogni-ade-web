import { Controller, Post, Body, Headers } from "@nestjs/common";
import { OAuthService } from "./oauth.service";
import { TokenRequestDto, UpdateUserRequestDto } from "./oauth.dto";
import { AuthService } from "../auth/auth.service";
import { AuthType, OAuthUserProvider, UserDetails } from "@prisma/client";

@Controller("oauth")
export class OAuthController {
  constructor(
    private readonly oAuthService: OAuthService,
    private readonly authService: AuthService
  ) {}
  @Post("register")
  async Register(@Body() tokenRequestDto: TokenRequestDto) {
    switch (tokenRequestDto.type) {
      // more modularity
      case OAuthUserProvider.GOOGLE:
        const googleUserData = await this.oAuthService.getGoogleUserInfo(
          tokenRequestDto.code
        );
        const googleUserDetails: Partial<UserDetails> = {
          fullname: googleUserData.name,
        };

        const googleUser = await this.oAuthService.createOAuthUser(
          { type: tokenRequestDto.type, email: googleUserData.email },
          googleUserDetails
        );
        const googleToken = this.authService.authorize(
          { user: googleUser, ip: "", authType: AuthType.OAUTH },
          ""
        );
        return googleToken;

      case OAuthUserProvider.LINKEDIN:
        const accessToken = await this.oAuthService.getToken(tokenRequestDto);
        const linkedinUserData =
          await this.oAuthService.getLinkedinUserInfo(accessToken);
        const linkedinUserDetails: Partial<UserDetails> = {
          fullname: linkedinUserData.name,
        };
        const linkedinUser = await this.oAuthService.createOAuthUser(
          { type: tokenRequestDto.type, email: linkedinUserData.email },
          linkedinUserDetails
        );
        const linkedinToken = this.oAuthService.authorize(linkedinUser.id);
        return linkedinToken;

      default:
        throw new Error("Unsupported OAuth type");
    }
  }

  @Post("update-user")
  async updateUser(
    @Body() updateUserRequestDto: UpdateUserRequestDto,
    @Headers("authorization") token: string
  ) {
    const authToken = token.split(" ")[1].replace(/['"]+/g, "");
    const details = await this.oAuthService.updateUserDetails(
      updateUserRequestDto,
      authToken
    );
    return details;
  }
}

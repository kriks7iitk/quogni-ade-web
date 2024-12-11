import { Controller, Post, Body, Headers } from "@nestjs/common";
import { OAuthService } from "./oauth.service";
import { TokenRequestDto, UpdateUserRequestDto } from "./oauth.dto";
import { AuthService } from "../auth/auth.service";
import { AuthType, OAuthUserProvider, UserDetails } from "@prisma/client";

@Controller("oauth")
export class OAuthController {
  constructor(private readonly oAuthService: OAuthService) {}
  @Post("register")
  async Register(@Body() tokenRequestDto: TokenRequestDto) {
    return this.oAuthService.createOAthUserFromRequest(tokenRequestDto);
  }

  // @Post("update-user")
  // async updateUser(
  //   @Body() updateUserRequestDto: UpdateUserRequestDto,
  //   @Headers("authorization") token: string
  // ) {
  //   const authToken = token.split(" ")[1].replace(/['"]+/g, "");
  //   const details = await this.oAuthService.updateUserDetails(
  //     updateUserRequestDto,
  //     authToken
  //   );
  //   return details;
  // }
}

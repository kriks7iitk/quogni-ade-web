import {
  Controller,
  Post,
  Body,
  Headers,
  UseGuards,
  Put,
} from "@nestjs/common";
import { User } from "../auth/decorators/user-decorator";
import { UserData } from "../auth/interfaces/auth-interface";
import { UpdateUserDto } from "../user/user.dto";
import { OAuthService } from "./oauth.service";
import { TokenRequestDto } from "./oauth.dto";
import { JwtAuthGuard } from "../auth/auth-guard/auth-guard";

@Controller("oauth")
export class OAuthController {
  constructor(private readonly oAuthService: OAuthService) {}
  @Post("register")
  async Register(@Body() tokenRequestDto: TokenRequestDto) {
    return this.oAuthService.createOAthUserFromRequest(tokenRequestDto);
  }

  @Post("signin")
  async signin(@Body() tokenRequestDto: TokenRequestDto) {
    return this.oAuthService.signInOAuthUserFromRequest(tokenRequestDto);
  }

  @Put("update")
  @UseGuards(JwtAuthGuard)
  async update(
    @User() userData: UserData,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.oAuthService.updateUserDetail(
      updateUserDto,
      userData.user.id
    );
  }
}

import { Controller, Post, Body, Param, UseGuards, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { OAuthService } from "../oauth/oauth.service";
import { UpdateUserDto } from "./user.dto";
import { JwtAuthGuard } from "../auth/auth-guard/auth-guard";
import { UserData } from "../auth/interfaces/auth-interface";
import { User } from "../auth/decorators/user-decorator";
import { AuthType } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put("update")
  @UseGuards(JwtAuthGuard)
  async update(
    @User() userData: UserData,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.userService.updateUserDetails(
      updateUserDto,
      userData.user.id
    );
  }
}

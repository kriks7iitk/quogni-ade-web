import { Module } from "@nestjs/common";
import { OAuthController } from "./oauth.controller";
import { OAuthService } from "./oauth.service";
import { HttpModule } from "@nestjs/axios";
import { UserService } from "../user/user.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "../auth/auth.module";
@Module({
  imports: [JwtModule.register({}), HttpModule, AuthModule],
  controllers: [OAuthController],
  exports: [OAuthService],
  providers: [OAuthService],
})
export class OAuthModule {}
import { Module } from '@nestjs/common';
import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [JwtModule.register({}), HttpModule],

  controllers: [OAuthController],
  providers: [OAuthService, UserService, PrismaService, AuthService],
})
export class OAuthModule {}
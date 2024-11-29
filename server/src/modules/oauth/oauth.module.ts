import { Module } from '@nestjs/common';
import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [HttpModule],

  controllers: [OAuthController],
  providers: [OAuthService, UserService, PrismaService],
})
export class OAuthModule {}
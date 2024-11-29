import { Module } from '@nestjs/common';
import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],

  controllers: [OAuthController],
  providers: [OAuthService],
})
export class OAuthModule {}
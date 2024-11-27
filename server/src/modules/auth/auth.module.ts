import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [JwtModule.register({}), UserModule, HttpModule],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

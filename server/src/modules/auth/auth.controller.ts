import { Controller, Post, Body, Get, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  SendOtpDto,
  SignUpDto,
  AuthorizeDto,
  ResendOtpDto,
} from "@/modules/auth/auth.dto";
import { User } from "@prisma/client";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signUp(@Body() signUpDto: SignUpDto) {
    console.log("this si working");
    
    const user = await this.authService.signUp(signUpDto);
    return user;
  }

  @Post("send-otp")
  async sendOtp(@Body() sendOtpDto: SendOtpDto): Promise<User> {
    return await this.authService.signIn(sendOtpDto);
  }

  @Post("authorize")
  async authorize(@Body() authorizeDto: AuthorizeDto, @Req() request: Request) {
    const ip = request.headers["x-forwarded-for"] || "";
    return await this.authService.verifyPhoneNumberAndAuthorize(
      authorizeDto,
      ip
    );
  }

  @Post("resend-otp")
  async resendOtp(@Body() resendDto: ResendOtpDto) {
    return await this.authService.resendOtp(resendDto);
  }
}

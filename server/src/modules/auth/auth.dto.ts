import { Prisma } from "@prisma/client";
import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsDateString,
  Length,
  IsNumber,
  IsEmail,
  IsOptional,
} from "class-validator";

export class SignUpDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsPhoneNumber(null, { message: "Phone number is invalid" })
  @IsOptional()
  phoneNumber?: string;

  @IsDateString({}, { message: "Date of birth must be a valid date" })
  @IsOptional()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  sector?: string;

  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  occupation?: string;
}

export class SendOtpDto {
  @IsPhoneNumber(null, { message: "Phone number is invalid" })
  @IsNotEmpty({ message: "Phone number is required" })
  phoneNumber: string;
}

export class AuthorizeDto {
  @IsNumber(null, { message: "user id is invalid" })
  @IsNotEmpty({ message: "Phone number is required" })
  userId: number;

  @IsNotEmpty({ message: "OTP is required" })
  @IsNumber(null, { message: "user id is invalid" })
  @Length(4, 4, { message: "OTP must be 4 digits long" })
  otp: number;
}

export class ResendOtpDto {
  @IsNumber(null, { message: "user id is invalid" })
  @IsNotEmpty({ message: "Phone number is required" })
  userId: number;

  @IsPhoneNumber(null, { message: "Phone number is invalid" })
  @IsNotEmpty({ message: "Phone number is required" })
  phoneNumber: string;
}

export type UserType = Prisma.UserGetPayload<{
  include: { userDetails: true };
}>;

export type OAuthUserType = Prisma.OAuthUserGetPayload<{
  include: { oAuthUerDetails: true };
}>;

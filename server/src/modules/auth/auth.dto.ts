import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsDateString,
  Length,
  IsNumber,
  IsEmail,
} from "class-validator";

export class SignUpDto {
  @IsString()
  @IsNotEmpty({ message: "Username is required" })
  username: string;

  @IsPhoneNumber(null, { message: "Phone number is invalid" })
  @IsNotEmpty({ message: "Phone number is required" })
  phoneNumber: string;

  @IsDateString({}, { message: "Date of birth must be a valid date" })
  @IsNotEmpty({ message: "Date of birth is required" })
  dateOfBirth: Date;

  @IsString()
  sector: string;

  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  occupation: string;
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
  @Length(4, 4, { message: "OTP must be 6 digits long" })
  otp: number;
}

import { OAuthUserType } from "@prisma/client";
import {
    IsString,
    IsNotEmpty,
  } from "class-validator";

export class TokenRequestDto {
    @IsString()
    @IsNotEmpty({message: "code cannot is required"})
    code: string;

    @IsString()
    @IsNotEmpty({message: "type cannot is required"})
    type: string;

    @IsString()
    @IsNotEmpty({message: "redirect uri is required"})
    redirect_uri: string;
}

export class OAuthUserDetails {
  @IsString()
  @IsNotEmpty({message: "Name is required"})
  fullName: string;
}

export class OAuthSignUpDto {
  @IsString()
  @IsNotEmpty({message: "Type is required"})
  type: OAuthUserType;

  @IsString()
  @IsNotEmpty({message: "Email is required"})
  email: string;
}

export class UpdateUserRequestDto {
  username: string;
  dateOfBirth: string;
  occupation: string;
  sector: string;
}
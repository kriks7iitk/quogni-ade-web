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
import { AuthType } from "@prisma/client";
import {
  IsString,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsArray,
} from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  fullname: string;

  @IsBoolean()
  @IsOptional()
  isOnboarded: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  preferredSectors: string[];

  @IsDateString()
  @IsOptional()
  dateOfBirth: string;

  @IsString()
  @IsOptional()
  occupation: string;

  @IsString()
  @IsOptional()
  sector: string;
}

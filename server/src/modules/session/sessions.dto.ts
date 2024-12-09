import { IsString, IsDateString, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsString()
  phoneNumber: string;

  @IsString()
  username: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth: Date;

  @IsString()
  @IsOptional()
  salarySlab: string;

  @IsString()
  @IsOptional()
  occupation: string;
}

import { AuthType } from '@prisma/client';
import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  authType: AuthType;

  @IsString()
  username: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  @IsOptional()
  occupation: string;

  @IsString()
  @IsOptional()
  sector: string;
}


    // id          Int       @id @default(autoincrement())
    // authType    AuthType
    // username    String    @unique
    // fullname    String  
    // dateOfBirth DateTime?
    // isOnboarded Boolean   @default(false) 
    // sector      String?
    // occupation  String?
    // userId      Int?
    // oAuthUserId Int? 
    // user        User?      @relation(fields: [userId], references: [id], onDelete: Cascade)
    // oAuthUser   OAuthUser?      @relation(fields: [oAuthUserId], references: [id], onDelete: Cascade)
    // createdAt     DateTime  @default(now())
    // updatedAt     DateTime  @default(now())

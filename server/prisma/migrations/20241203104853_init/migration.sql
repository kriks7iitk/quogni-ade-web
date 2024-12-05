/*
  Warnings:

  - A unique constraint covering the columns `[oAuthUserId]` on the table `UserDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `oAuthUserId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oAuthUserId` to the `UserDetails` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OAuthUserType" AS ENUM ('GOOGLE', 'LINKEDIN');

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "oAuthUserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserDetails" ADD COLUMN     "oAuthUserId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "OAuthUser" (
    "id" SERIAL NOT NULL,
    "type" "OAuthUserType" NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OAuthUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuthUser_email_key" ON "OAuthUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_oAuthUserId_key" ON "UserDetails"("oAuthUserId");

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_oAuthUserId_fkey" FOREIGN KEY ("oAuthUserId") REFERENCES "OAuthUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_oAuthUserId_fkey" FOREIGN KEY ("oAuthUserId") REFERENCES "OAuthUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

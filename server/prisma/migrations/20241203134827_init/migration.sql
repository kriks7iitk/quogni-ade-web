/*
  Warnings:

  - You are about to drop the column `oAuthUserId` on the `UserDetails` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserDetails" DROP CONSTRAINT "UserDetails_oAuthUserId_fkey";

-- DropIndex
DROP INDEX "UserDetails_oAuthUserId_key";

-- AlterTable
ALTER TABLE "UserDetails" DROP COLUMN "oAuthUserId";

-- CreateTable
CREATE TABLE "OAuthUserDetails" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "oAuthUserId" INTEGER NOT NULL,

    CONSTRAINT "OAuthUserDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuthUserDetails_oAuthUserId_key" ON "OAuthUserDetails"("oAuthUserId");

-- AddForeignKey
ALTER TABLE "OAuthUserDetails" ADD CONSTRAINT "OAuthUserDetails_oAuthUserId_fkey" FOREIGN KEY ("oAuthUserId") REFERENCES "OAuthUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

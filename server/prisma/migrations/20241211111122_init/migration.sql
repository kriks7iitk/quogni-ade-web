/*
  Warnings:

  - Changed the type of `type` on the `OAuthUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OAuthUserProvider" AS ENUM ('GOOGLE', 'LINKEDIN');

-- AlterTable
ALTER TABLE "OAuthUser" DROP COLUMN "type",
ADD COLUMN     "type" "OAuthUserProvider" NOT NULL;

-- DropEnum
DROP TYPE "OAuthUserType";

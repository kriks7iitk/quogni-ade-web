/*
  Warnings:

  - The values [GOOGLE,LINKEDIN] on the enum `OAuthUserType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OAuthUserType_new" AS ENUM ('google', 'linkedin');
ALTER TABLE "OAuthUser" ALTER COLUMN "type" TYPE "OAuthUserType_new" USING ("type"::text::"OAuthUserType_new");
ALTER TYPE "OAuthUserType" RENAME TO "OAuthUserType_old";
ALTER TYPE "OAuthUserType_new" RENAME TO "OAuthUserType";
DROP TYPE "OAuthUserType_old";
COMMIT;

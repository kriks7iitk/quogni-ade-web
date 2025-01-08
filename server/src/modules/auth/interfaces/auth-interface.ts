import {
  AuthType,
  OAuthUser,
  OAuthUserProvider,
  Prisma,
  User,
} from "@prisma/client";

export interface UserPayload {
  sub: number;
  sessionId: number;
  user: OAuthUser | User;
  authType: AuthType;
}

export interface UserData {
  user: User;
  sessionId: number;
  authType: AuthType;
}

export interface UserDetail {
  username?: string;
  fullname?: string;
  dateOfBirth?: Date;
  sector?: String;
  preferredSectors?: String[];
  occupation?: String;
}

export type UserType = Prisma.UserGetPayload<{
  include: { userDetails: true };
}>;

export type OAuthUserType = Prisma.OAuthUserGetPayload<{
  include: { userDetails: true };
}>;

export interface AuthorizeObject {
  user: User | OAuthUser;
  ip: string;
  authType: AuthType;
}

export type CreateOAuthUserObject = {
  type: OAuthUserProvider;
  email: string;
};

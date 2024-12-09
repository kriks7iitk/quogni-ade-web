import { User, OAuthUser } from "@prisma/client";

export type SessionCreate = {
  ip: string;
  user: User | OAuthUser;
};

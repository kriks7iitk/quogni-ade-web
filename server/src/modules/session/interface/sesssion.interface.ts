import { AuthType } from "@prisma/client";

export type SessionCreate = {
  ip: string;
  userId: number;
  authType: AuthType;
};

import { User } from "@prisma/client";

export type SessionCreate = {
  ip: string;
  user: User;
};

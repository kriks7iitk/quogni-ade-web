import { User } from "@prisma/client";

export interface UserPayload {
  sub: number;
  username: string;
  sessionId: number;
}

export interface UserData {
  user: User;
  sessionId: number;
}

import { Controller, Get, UseGuards } from "@nestjs/common";
import { User } from "../auth/decorators/user-decorator";
import { UserData } from "../auth/interfaces/auth-interface";
import { JwtAuthGuard } from "../auth/auth-guard/auth-guard";
import { SessionAuthGuard } from "../auth/auth-guard/session-auth-guard";
import { SessionService } from "./sessions.services";

@Controller("sessions")
export class SessionsController {
  constructor(private sessionService: SessionService) {}

  @Get("validate")
  @UseGuards(SessionAuthGuard)
  async validateSession(@User() user: UserData) {
    const session = await this.sessionService.get(user.sessionId);
    return session;
  }
}

import { Controller, Get, UseGuards } from "@nestjs/common";
import { User } from "../auth/decorators/user-decorator";
import { UserData } from "../auth/interfaces/auth-interface";
import { SessionAuthGuard } from "../auth/auth-guard/session-auth-guard";
import { SessionService } from "./sessions.services";

@Controller("sessions")
export class SessionsController {
  constructor(private sessionService: SessionService) {}

  @Get("validate")
  @UseGuards(SessionAuthGuard)
  async validateSession(@User() user: UserData) {
    console.log("user is ");
    console.log(user);

    const sessionData = await this.sessionService.getSessionData(
      user.sessionId
    );
    return sessionData;
  }
}

import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserPayload } from "../interfaces/auth-interface";
import { UserService } from "@/modules/user/user.service";
import { SessionService } from "@/modules/session/sessions.services";
import { AuthType, OAuthUser, User } from "@prisma/client";
import { OAuthService } from "@/modules/oauth/oauth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UserService,
    private configService: ConfigService,
    private sessionService: SessionService,
    private oAuthService: OAuthService
  ) {
    super({
      jwtFromRequest: (request) => {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        return token;
      },
      ignoreExpiration: true,
      secretOrKey: configService.get<string>("JWT_SECRET"),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: UserPayload) {
    const isGetUserSession = !!req["isGetUserSession"];
    let user: User | OAuthUser;
    if (payload.authType == AuthType.LOCAL) {
      user = await this.usersService.findUserById(payload.sub);
    } else {
      user = await this.oAuthService.get(payload.sub);
    }
    if (!user)
      throw new BadRequestException({
        message: {
          error: "User is deleted",
        },
      });
    if (isGetUserSession) {
      await this.sessionService.validateSession(payload.sessionId);
    }
    return { user, sessionId: payload?.sessionId };
  }
}

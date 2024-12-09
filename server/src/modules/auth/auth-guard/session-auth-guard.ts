import { createError } from "@/utility/helpers";
import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AUTH_ERROR_CODE } from "../constants/error-codes";
import { AUTH_ERROR_MESSAGE } from "../constants/error-messages";

@Injectable()
export class SessionAuthGuard extends AuthGuard("jwt") {
  async canActivate(context: ExecutionContext): Promise<any> {
    let user;
    const request = context.switchToHttp().getRequest();
    request.isGetUserSession = true;
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token && token.trim() !== "") {
      try {
        user = await super.canActivate(context);
      } catch (err) {
        throw new BadRequestException();
      }
      return user;
    }
    throw new UnauthorizedException({
      message: {
        ...createError(
          AUTH_ERROR_CODE,
          AUTH_ERROR_MESSAGE,
          "SESSION_NOT_EXIST"
        ),
      },
    });
  }
}

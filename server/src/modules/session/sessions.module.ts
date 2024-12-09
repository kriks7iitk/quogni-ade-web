import { Module } from "@nestjs/common";
import { SessionService } from "./sessions.services";
import { SessionsController } from "./sessions.controller";
// import { SessionController } from './.controller';

@Module({
  controllers: [SessionsController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "@/modules/auth/auth.module";
import { OAuthModule } from "@/modules/oauth/oauth.module";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "./modules/user/user.module";
import { PrismaModule } from "@/modules/prisma/prisma.module";
import { LoggerModule } from "nestjs-pino";
import { join } from "path";
import { SessionModule } from "./modules/session/sessions.module";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./modules/auth/jwt-strategy/jwt-strategy";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== "production"
            ? {
                target: "pino-pretty", // Use pino-pretty for dev logs
                options: {
                  colorize: true, // Enable colored logs in dev
                  translateTime: true, // Human-readable timestamps
                  ignore: "pid,hostname", // Omit unnecessary fields
                  singleLine: false, // Allow multi-line logs for better readability
                  errorProps: "*", // Log all error properties, including stack traces
                },
              }
            : undefined, // Disable pretty print in production
        level: process.env.NODE_ENV !== "production" ? "debug" : "info", // Debug in dev, info in prod
        customLogLevel: (res, err) => {
          if (res.statusCode >= 400 && res.statusCode < 500) return "warn";
          if (res.statusCode >= 500 || err) return "error";
          return "info";
        },
        serializers: {
          err: (err) => {
            return {
              type: err.type,
              message: err.message,
              stack: err.stack, // Add stack trace in error logs
              statusCode: err.statusCode || "N/A",
            };
          },
          req: (req) => ({
            method: req.method,
            url: req.url,
            headers: req.headers,
            remoteAddress: req.remoteAddress,
            remotePort: req.remotePort,
          }),
          res: (res) => ({
            statusCode: res.statusCode,
          }),
        },
      },
    }),
    ConfigModule.forRoot({
      // envFilePath: join(__dirname, "../.env"),
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    OAuthModule,
    UserModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    SessionModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get("JWT_SECRET") || "yourSecretKey";
        console.log("JWT_SECRET:", secret);
        return {
          secret: secret,
          secretOrPrivateKey: secret,
          signOptions: { expiresIn: "15m" },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
  exports: [],
})
export class AppModule {}

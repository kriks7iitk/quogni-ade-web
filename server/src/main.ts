import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cors from "cors";
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

async function bootstrap() {
  console.log(`Running on Node.js version: ${process.version}`);
  console.log(`Environment is: ${process.env.NODE_ENV}`);

  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin:
        process.env.NODE_ENV == "prod"
          ? `https://${process.env.VITE_CLIENT_HOST}:${process.env.VITE_CLIENT_PORT}`
          : `http://${process.env.VITE_CLIENT_HOST}:${process.env.VITE_CLIENT_PORT}`,
    })
  );
  const HOST = process.env.VITE_SERVER_HOST || "localhost";
  const PORT = parseInt(process.env.VITE_SERVER_PORT, 10) || 3000;
  await app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}
bootstrap();

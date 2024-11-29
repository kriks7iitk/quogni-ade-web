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
        `http://localhost:8082`,
    })
  );
  const HOST = process.env.VITE_SERVER_HOST || "localhost";
  const PORT = parseInt(process.env.VITE_SERVER_PORT, 10) || 3000;
  await app.listen(3000, 'localhost', () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}
bootstrap();

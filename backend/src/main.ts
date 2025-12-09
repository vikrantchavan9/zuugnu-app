import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get ConfigService to read .env variables safely
  const configService = app.get(ConfigService);
  const port = configService.get<number>("BACKEND_PORT") || 4001;
  const frontendUrl =
    configService.get<string>("FRONTEND_URL") || "http://localhost:4000";

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  await app.listen(port);
  console.log(`Backend is running on: http://localhost:${port}`);
  console.log(`Accepting requests from: ${frontendUrl}`);
}
bootstrap();

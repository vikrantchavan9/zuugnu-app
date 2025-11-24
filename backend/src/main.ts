import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
     const app = await NestFactory.create(AppModule);

     // Get ConfigService to read .env variables safely
     const configService = app.get(ConfigService);
     const port = configService.get<number>('BACKEND_PORT') || 3001;
     const frontendUrl = configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';

     app.enableCors({
          origin: '*',
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          credentials: true,
     });

     await app.listen(3001);
     console.log(`Backend is running on: http://localhost:${port}`);
     console.log(`Accepting requests from: ${frontendUrl}`);
}
bootstrap();
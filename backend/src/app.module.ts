import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
     imports: [
          // 1. Load the .env file globally.
          // This is CRITICAL. Without this, process.env.DB_PASSWORD is undefined.
          ConfigModule.forRoot({
               isGlobal: true,
               envFilePath: '.env',
          }),

          // 2. Import your other modules
          DatabaseModule,
          AuthModule,
     ],
     controllers: [AppController],
     providers: [],
})
export class AppModule { }
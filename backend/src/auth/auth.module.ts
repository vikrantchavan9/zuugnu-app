import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';

@Module({
     imports: [
          DatabaseModule,
          JwtModule.register({
               global: true,
               secret: process.env.JWT_SECRET || 'DO_NOT_USE_THIS_IN_PROD_SECRET_KEY',
               signOptions: { expiresIn: '7d' }, // Token expires in 7 days
          }),
     ],
     controllers: [AuthController],
     providers: [AuthService],
})
export class AuthModule { }
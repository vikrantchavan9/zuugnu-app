import { Controller, Post, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';

// Define the expected shape of the body
export class LoginDto {
     phone!: string;
     password!: string;
}

@Controller('auth')
export class AuthController {
     constructor(private authService: AuthService) { }

     @HttpCode(HttpStatus.OK)
     @Post('login')
     async signIn(@Body() signInDto: LoginDto) {
          try {
               return await this.authService.login(signInDto.phone, signInDto.password);
          } catch (error: any) {
               // FIX: Explicitly catch the 401 error and force NestJS to send 401.
               // This bypasses the issue where it was being treated as a 500 crash.
               if (error.status === 401 || error.response?.statusCode === 401) {
                    throw new HttpException(
                         error.response || 'Invalid phone number or password',
                         HttpStatus.UNAUTHORIZED,
                    );
               }

               // If it's a real server crash, throw 500
               throw new HttpException(
                    'Internal Server Error',
                    HttpStatus.INTERNAL_SERVER_ERROR,
               );
          }
     }
}
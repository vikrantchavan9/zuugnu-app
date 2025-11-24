import { Injectable, Inject, HttpException, HttpStatus, InternalServerErrorException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Pool } from 'pg';

@Injectable()
export class AuthService {
     private readonly logger = new Logger(AuthService.name);

     constructor(
          @Inject('DATABASE_CONNECTION') private pool: Pool,
          private jwtService: JwtService,
     ) { }

     async login(phone: string, plainPassword: string) {
          const normalizedPhone = phone.replace(/\D/g, '');
          this.logger.log(`Attempting login for phone: ${normalizedPhone}`);

          let user;

          // STEP 1: Database Query
          try {
               const query = `
        SELECT id, phone, name, password_plain 
        FROM users 
        WHERE phone = $1
      `;
               const result = await this.pool.query(query, [normalizedPhone]);
               user = result.rows[0];
          } catch (error) {
               this.logger.error('CRITICAL: Database connection or query failed', error);
               throw new InternalServerErrorException('Database error. Check backend terminal.');
          }

          // STEP 2: Validation Logic

          // Check if user exists
          if (!user) {
               this.logger.warn(`Login Failed: User not found for phone ${normalizedPhone}`);
               // Using generic HttpException is safer against 500 conversion issues
               throw new HttpException('Invalid phone number or password', HttpStatus.UNAUTHORIZED);
          }

          // Check Password
          if (plainPassword !== user.password_plain) {
               this.logger.warn(`Login Failed: Password mismatch for phone ${normalizedPhone}`);
               throw new HttpException('Invalid phone number or password', HttpStatus.UNAUTHORIZED);
          }

          // STEP 3: Success
          this.logger.log(`Login successful for: ${normalizedPhone}`);

          const payload = { sub: user.id, phone: user.phone, name: user.name };

          return {
               access_token: this.jwtService.sign(payload),
               user: {
                    name: user.name,
                    phone: user.phone
               }
          };
     }
}
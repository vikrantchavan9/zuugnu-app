import { JwtService } from '@nestjs/jwt';
import { Pool } from 'pg';
export declare class AuthService {
    private pool;
    private jwtService;
    private readonly logger;
    constructor(pool: Pool, jwtService: JwtService);
    login(phone: string, plainPassword: string): Promise<{
        access_token: string;
        user: {
            name: any;
            phone: any;
        };
    }>;
}

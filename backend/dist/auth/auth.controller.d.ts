import { AuthService } from './auth.service';
export declare class LoginDto {
    phone: string;
    password: string;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: LoginDto): Promise<{
        access_token: string;
        user: {
            name: any;
            phone: any;
        };
    }>;
}

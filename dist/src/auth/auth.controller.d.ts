import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        statusCode: number;
        message: string;
        accessToken: string;
    }>;
}

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly prisma;
    constructor(usersService: UsersService, jwtService: JwtService, prisma: PrismaService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    validateUser(email: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        message: string;
    }>;
}

import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './auth/dto/register.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(registerDto: RegisterDto): Promise<{
        email: string;
        password: string;
        role: string;
        id: string;
    }>;
    findUserByEmail(email: string): Promise<{
        email: string;
        password: string;
        role: string;
        id: string;
    } | null>;
}

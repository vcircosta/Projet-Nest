import { PrismaService } from '../../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findUserByEmail(email: string): Promise<{
        email: string;
        password: string;
        role: string;
        id: string;
    } | null>;
}

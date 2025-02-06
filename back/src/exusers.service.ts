import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';  
import { RegisterDto } from './auth/dto/register.dto';  


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(registerDto: RegisterDto) {
    return this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: registerDto.password,
        role: registerDto.role,
      },
    });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}

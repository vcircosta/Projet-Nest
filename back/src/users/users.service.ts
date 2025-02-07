import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';  
import { RegisterDto } from '../auth/dto/register.dto';  


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {

    if (!email) {
      throw new Error("Email is required.");
    }


    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}


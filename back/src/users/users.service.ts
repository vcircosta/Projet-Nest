import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';  
import { RegisterDto } from '../auth/dto/register.dto';  


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Cette méthode recherche un utilisateur par email
  async findUserByEmail(email: string) {
    // Vérification si l'email est bien fourni
    if (!email) {
      throw new Error("Email is required.");
    }

    // Recherche de l'utilisateur par son email
    return this.prisma.user.findUnique({
      where: {
        email: email,  // Utilisation de l'email passé en paramètre
      },
    });
  }
}


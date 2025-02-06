import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Assure-toi d'importer PrismaService
import { UsersService } from './users.service'; // Importer UsersService ici

@Module({
  providers: [PrismaService, UsersService],  // Déclarer PrismaService ici avec UsersService
  exports: [UsersService],  // Exporte UsersService si tu en as besoin ailleurs
})
export class UsersModule {}
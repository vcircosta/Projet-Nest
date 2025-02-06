import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';  // Vérifiez que le chemin est correct
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { RolesGuard } from './roles.guard';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, RolesGuard, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}

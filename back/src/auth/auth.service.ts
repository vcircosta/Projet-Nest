import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Enregistre un nouvel utilisateur.
   * @param registerDto - Les informations de l'utilisateur à enregistrer.
   */
  async register(registerDto: RegisterDto) {
    const { email, password, role } = registerDto;

    // Vérification de la validité de l'email et du mot de passe
    if (!email || !email.trim()) {
      throw new BadRequestException('Email is required.');
    }

    if (!password || password.length < 6) {
      throw new BadRequestException('Password is required and should have at least 6 characters.');
    }

    // Vérifie si l'email existe déjà dans la base de données
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    try {
      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Création de l'utilisateur dans la base de données
      const newUser = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role,
        },
      });

      // Retourner les informations de l'utilisateur enregistré
      return {
        message: 'User successfully registered',
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
        },
      };
    } catch (error) {
      // Log et gestion des erreurs en cas d'échec de la création
      console.error('Error during user registration:', error);
      throw new BadRequestException('Error during user registration');
    }
  }

  /**
   * Valide les informations de l'utilisateur lors de la connexion.
   * @param email - L'email de l'utilisateur.
   * @param password - Le mot de passe de l'utilisateur.
   * @returns L'utilisateur si les informations sont valides.
   */
  async validateUser(email: string, password: string): Promise<any> {
    if (!email) {
      throw new BadRequestException('Email is required.');
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  /**
   * Authentifie un utilisateur et génère un JWT.
   * @param loginDto - Les informations de connexion.
   * @returns Un objet contenant le token d'accès et un message de succès.
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
  
    if (!email) {
      throw new BadRequestException('Email is required.');
    }
  
    const user = await this.usersService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = { userId: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);
  
    // Retourner uniquement les données nécessaires
    return {
      accessToken,
      message: 'Login successful',
    };
  }
  
  
}

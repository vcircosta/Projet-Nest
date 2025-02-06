"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, prisma) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async register(registerDto) {
        const { email, password, role } = registerDto;
        if (!email || !email.trim()) {
            throw new common_1.BadRequestException('Email is required.');
        }
        if (!password || password.length < 6) {
            throw new common_1.BadRequestException('Password is required and should have at least 6 characters.');
        }
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email is already in use');
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await this.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role,
                },
            });
            return {
                message: 'User successfully registered',
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    role: newUser.role,
                },
            };
        }
        catch (error) {
            console.error('Error during user registration:', error);
            throw new common_1.BadRequestException('Error during user registration');
        }
    }
    async validateUser(email, password) {
        if (!email) {
            throw new common_1.BadRequestException('Email is required.');
        }
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        if (!email) {
            throw new common_1.BadRequestException('Email is required.');
        }
        const user = await this.usersService.findUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { userId: user.id, role: user.role };
        const accessToken = this.jwtService.sign(payload);
        return {
            accessToken,
            message: 'Login successful',
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
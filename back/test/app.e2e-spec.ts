import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationService } from '../src/reservation/reservation.service';
import { ReservationController } from '../src/reservation/reservation.controller';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';


describe('AuthController, MoviesController & ReservationController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  // Tests pour AuthController
  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      const registerDto = {
        email: 'testuser@example.com',
        password: 'password123',
        role: 'user',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'User successfully registered');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user).toHaveProperty('email', registerDto.email);
      expect(response.body.user).toHaveProperty('role', registerDto.role);
    });

    it('should not allow duplicate email registration', async () => {
      const registerDto = {
        email: 'testuser@example.com',
        password: 'password123',
        role: 'user',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(409);

      expect(response.body).toHaveProperty('message', 'Email is already in use');
    });
  });

  // Tests pour MoviesController
  describe('GET /movies', () => {
    it('should return a list of movies successfully', async () => {
      const response = await request(app.getHttpServer())
        .get('/movies')
        .query({ page: 1, search: 'Batman', sort: 'popularity.desc' })
        .expect(200);

      expect(response.body).toHaveProperty('results');
      expect(Array.isArray(response.body.results)).toBe(true);
      expect(response.body.results.length).toBeGreaterThan(0);
      expect(response.body.results[0]).toHaveProperty('id');
      expect(response.body.results[0]).toHaveProperty('title');
    });

    it('should handle errors and return an empty list if API call fails', async () => {
      const response = await request(app.getHttpServer())
        .get('/movies')
        .query({ page: 1, search: 'NonExistentMovie', sort: 'popularity.desc' })
        .expect(200);

      expect(response.body).toHaveProperty('results');
      expect(response.body.results).toEqual([]);
    });
  });

  describe('POST /auth/login', () => {
    it('should login an existing user successfully', async () => {
      const loginDto = {
        email: 'testuser@example.com',
        password: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(200);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('message', 'Login successful');
    });

    it('should not login with invalid credentials', async () => {
      const loginDto = {
        email: 'testuser@example.com',
        password: 'wrongpassword',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(401);

      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });
  });

  // Tests pour ReservationController
  describe('ReservationController (e2e)', () => {
    let reservationId: string;
    const userId = '12345';
    const movieId = '67890';
    const timeSlot = '2025-02-10T18:00:00Z';

    it('should create a reservation', async () => {
      const reservationData = { userId, movieId, timeSlot };

      const response = await request(app.getHttpServer())
        .post('/reservations')
        .send(reservationData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      reservationId = response.body.id;
    });

    it('should not allow overlapping reservations', async () => {
      const overlappingReservation = {
        userId,
        movieId: '67891',
        timeSlot: '2025-02-10T18:30:00Z', // Se chevauche avec la première réservation
      };

      const response = await request(app.getHttpServer())
        .post('/reservations')
        .send(overlappingReservation)
        .expect(409);

      expect(response.body.message).toBe('Conflit de réservation : Un autre film est déjà réservé sur ce créneau.');
    });

    it('should retrieve user reservations', async () => {
      const response = await request(app.getHttpServer())
        .get(`/reservations/${userId}`)
        .expect(200);

      expect(response.body.length).toBe(1);
    });

    it('should cancel a reservation', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/reservations/${reservationId}`)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Réservation annulée avec succès');
    });
  });

  afterAll(async () => {
    await prismaService.user.deleteMany({ where: { email: 'testuser@example.com' } });
    await app.close();
  });
});

describe('ReservationService', () => {
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationService],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        {
          provide: ReservationService,
          useValue: {
            createReservation: jest.fn(),
            getUserReservations: jest.fn(),
            cancelReservation: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findUserByEmail: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-jwt-token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });


  describe('login', () => {
    it('should return an access token on successful login', async () => {
      jest.spyOn(usersService, 'findUserByEmail').mockResolvedValue({
        id: '123',
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
      });

      const result = await authService.login({ email: 'test@example.com', password: 'password123' });

      expect(result).toEqual({
        accessToken: 'mocked-jwt-token',
        message: 'Login successful',
      });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      jest.spyOn(usersService, 'findUserByEmail').mockResolvedValue(null);

      await expect(authService.login({ email: 'test@example.com', password: 'password123' }))
        .rejects.toThrow(UnauthorizedException);
    });
  });
});
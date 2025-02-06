import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../src/reservation/reservation.controller';
import { ReservationService } from '../src/reservation/reservation.service';

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

import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/reservation.dto';
export declare class ReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    createReservation(createReservationDto: CreateReservationDto): import("./reservation.service").Reservation;
    getUserReservations(userId: string): import("./reservation.service").Reservation[];
    cancelReservation(id: string): {
        message: string;
    };
}

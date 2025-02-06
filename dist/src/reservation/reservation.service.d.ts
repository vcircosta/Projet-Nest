export interface Reservation {
    userId: string;
    movieId: string;
    timeSlot: string;
    endTime: string;
    id: string;
}
export declare class ReservationService {
    private reservations;
    createReservation(userId: string, movieId: string, timeSlot: string): Reservation;
    getReservationsByUserId(userId: string): Reservation[];
    cancelReservation(id: string): boolean;
}

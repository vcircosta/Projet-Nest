import { Injectable } from '@nestjs/common';

export interface Reservation {
  userId: string;
  movieId: string;
  timeSlot: string;
  endTime: string; // Heure de fin de la réservation
  id: string;
}

@Injectable()
export class ReservationService {
  private reservations: Reservation[] = [];

  /**
   * 📌 Créer une réservation avec vérification des conflits d'horaires.
   */
  createReservation(userId: string, movieId: string, timeSlot: string): Reservation {
    const startTime = new Date(timeSlot);
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // Ajouter 2 heures

    // Vérifier si l'utilisateur a déjà une réservation qui chevauche ce créneau
    const isConflict = this.reservations.some(reservation => {
      const reservedStartTime = new Date(reservation.timeSlot);
      const reservedEndTime = new Date(reservation.endTime);

      return (
        reservedStartTime < endTime &&
        reservedEndTime > startTime &&
        reservation.userId === userId
      );
    });

    if (isConflict) {
      throw new Error('Conflit de réservation : Un autre film est déjà réservé sur ce créneau.');
    }

    const reservation: Reservation = {
      userId,
      movieId,
      timeSlot,
      endTime: endTime.toISOString(),
      id: Date.now().toString(),
    };

    this.reservations.push(reservation);
    return reservation;
  }

  /**
   * 📌 Récupérer toutes les réservations d'un utilisateur.
   */
  getReservationsByUserId(userId: string): Reservation[] {
    return this.reservations.filter(reservation => reservation.userId === userId);
  }

  /**
   * 📌 Annuler une réservation.
   */
  cancelReservation(id: string): boolean {
    const index = this.reservations.findIndex(reservation => reservation.id === id);
    if (index === -1) return false;

    this.reservations.splice(index, 1);
    return true;
  }
}

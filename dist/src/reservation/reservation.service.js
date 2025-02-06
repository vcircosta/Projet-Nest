"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
let ReservationService = class ReservationService {
    constructor() {
        this.reservations = [];
    }
    createReservation(userId, movieId, timeSlot) {
        const startTime = new Date(timeSlot);
        const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);
        const isConflict = this.reservations.some(reservation => {
            const reservedStartTime = new Date(reservation.timeSlot);
            const reservedEndTime = new Date(reservation.endTime);
            return (reservedStartTime < endTime &&
                reservedEndTime > startTime &&
                reservation.userId === userId);
        });
        if (isConflict) {
            throw new Error('Conflit de réservation : Un autre film est déjà réservé sur ce créneau.');
        }
        const reservation = {
            userId,
            movieId,
            timeSlot,
            endTime: endTime.toISOString(),
            id: Date.now().toString(),
        };
        this.reservations.push(reservation);
        return reservation;
    }
    getReservationsByUserId(userId) {
        return this.reservations.filter(reservation => reservation.userId === userId);
    }
    cancelReservation(id) {
        const index = this.reservations.findIndex(reservation => reservation.id === id);
        if (index === -1)
            return false;
        this.reservations.splice(index, 1);
        return true;
    }
};
exports.ReservationService = ReservationService;
exports.ReservationService = ReservationService = __decorate([
    (0, common_1.Injectable)()
], ReservationService);
//# sourceMappingURL=reservation.service.js.map
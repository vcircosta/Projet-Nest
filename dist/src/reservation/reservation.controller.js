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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("./reservation.service");
const reservation_dto_1 = require("./dto/reservation.dto");
const swagger_1 = require("@nestjs/swagger");
let ReservationController = class ReservationController {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    createReservation(createReservationDto) {
        try {
            return this.reservationService.createReservation(createReservationDto.userId, createReservationDto.movieId, createReservationDto.timeSlot);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException('An unknown error occurred', common_1.HttpStatus.CONFLICT);
            }
        }
    }
    getUserReservations(userId) {
        return this.reservationService.getReservationsByUserId(userId);
    }
    cancelReservation(id) {
        const success = this.reservationService.cancelReservation(id);
        if (!success) {
            throw new common_1.HttpException('Réservation non trouvée', common_1.HttpStatus.NOT_FOUND);
        }
        return { message: 'Réservation annulée avec succès' };
    }
};
exports.ReservationController = ReservationController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une réservation' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Réservation créée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflit de réservation.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reservation_dto_1.CreateReservationDto]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "createReservation", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: "Récupérer les réservations d'un utilisateur" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des réservations.' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "getUserReservations", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Annuler une réservation' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Réservation annulée avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Réservation non trouvée.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "cancelReservation", null);
exports.ReservationController = ReservationController = __decorate([
    (0, swagger_1.ApiTags)('Reservations'),
    (0, common_1.Controller)('reservations'),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], ReservationController);
//# sourceMappingURL=reservation.controller.js.map
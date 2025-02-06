import { Controller, Get, Post, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/reservation.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une réservation' })
  @ApiResponse({ status: 201, description: 'Réservation créée avec succès.' })
  @ApiResponse({ status: 409, description: 'Conflit de réservation.' })
  createReservation(@Body() createReservationDto: CreateReservationDto) {
    try {
      return this.reservationService.createReservation(
        createReservationDto.userId,
        createReservationDto.movieId,
        createReservationDto.timeSlot,
      );
    } catch (error) {
        if (error instanceof Error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT);
          } else {
            throw new HttpException('An unknown error occurred', HttpStatus.CONFLICT);
          }
          
    }
  }

  @Get(':userId')
  @ApiOperation({ summary: "Récupérer les réservations d'un utilisateur" })
  @ApiResponse({ status: 200, description: 'Liste des réservations.' })
  getUserReservations(@Param('userId') userId: string) {
    return this.reservationService.getReservationsByUserId(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Annuler une réservation' })
  @ApiResponse({ status: 200, description: 'Réservation annulée avec succès.' })
  @ApiResponse({ status: 404, description: 'Réservation non trouvée.' })
  cancelReservation(@Param('id') id: string) {
    const success = this.reservationService.cancelReservation(id);
    if (!success) {
      throw new HttpException('Réservation non trouvée', HttpStatus.NOT_FOUND);
    }
    return { message: 'Réservation annulée avec succès' };
  }
}

import { IsString, IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ example: '12345', description: "L'ID de l'utilisateur" })
  @IsString()
  userId!: string;

  @ApiProperty({ example: '67890', description: "L'ID du film" })
  @IsString()
  movieId!: string;

  @ApiProperty({ example: '2025-02-10T18:00:00Z', description: "Heure de début de la réservation (format ISO 8601)" })
  @IsISO8601()
  timeSlot!: string;
}

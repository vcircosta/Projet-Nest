import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';  // Module des films
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // Charger les variables d'environnement
    MoviesModule,  // Importer MoviesModule pour gérer les films
    AuthModule,    // Importer AuthModule pour l'authentification
    UsersModule,   // Importer UsersModule pour gérer les utilisateurs
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'movies_db',
      entities: [User],
      synchronize: true,
    }),
    ReservationModule, // Importer ReservationModule pour gérer les réservations
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

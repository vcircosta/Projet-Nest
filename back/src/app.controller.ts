import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies/movies.service';  // Service des films

@Controller('movies') // Endpoint qui commence par "/movies"
export class AppController {
  constructor(private readonly moviesService: MoviesService) {} // Injecter MoviesService

  // Route qui retourne la liste des films
  @Get()
  async getMovies(): Promise<any> {
    return this.moviesService.getMovies();  // Appeler la méthode pour récupérer les films
  }
}

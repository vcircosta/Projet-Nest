import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies/movies.service';

@Controller('movies')
export class AppController {
  constructor(private readonly moviesService: MoviesService) {}


  @Get()
  async getMovies(): Promise<any> {
    return this.moviesService.getMovies();
  }
}

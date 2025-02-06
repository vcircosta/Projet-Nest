import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    getMovies(page?: number, search?: string, sort?: string): Promise<{
        results: any;
    }>;
}

import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class MoviesService {
    private readonly httpService;
    private readonly configService;
    private apiKey;
    private baseUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    getMovies(page?: number, search?: string, sort?: string): Promise<any>;
}

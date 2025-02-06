import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import axios, { AxiosError } from 'axios';

@Injectable()
export class MoviesService {
  private apiKey: string;
  private baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.apiKey = this.configService.get<string>('TMDB_API_KEY') || '';
  }

  async getMovies(page: number = 1, search: string = '', sort: string = 'popularity.desc') {
    let url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`;
    
    if (search) {
      url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(search)}&page=${page}`;
    }

    try {
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data.results;
    } catch (error: unknown) {
      // Vérification explicite de l'erreur Axios
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Erreur TMDB:', axiosError.response?.data || axiosError.message);
      } else {
        // Gestion d'une erreur générique
        const err = error as Error;
        console.error('Erreur inconnue:', err.message);
      }
      return [];
    }
  }
}

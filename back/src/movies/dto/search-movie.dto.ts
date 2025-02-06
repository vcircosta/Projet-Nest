export class SearchMovieDto {
  query: string;

  constructor(query: string) {
    this.query = query;
  }
}

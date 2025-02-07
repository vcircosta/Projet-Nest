// src/components/MoviesList.tsx
import React from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
}

interface MoviesListProps {
  movies: Movie[];
}

const MoviesList: React.FC<MoviesListProps> = ({ movies }) => {
  return (
    <div>
      <h2>Films disponibles</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ border: '1px solid #ddd', padding: '10px', width: '200px' }}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%' }}
              />
            ) : (
              <p>Pas d'image</p>
            )}
            <h3>{movie.title}</h3>
            <p>Date de sortie: {movie.release_date || 'Inconnue'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;

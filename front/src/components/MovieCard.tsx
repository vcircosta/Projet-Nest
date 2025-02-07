// src/components/MovieCard.tsx
import React from 'react';

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    description: string;
    posterPath: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
    </div>
  );
};

export default MovieCard;

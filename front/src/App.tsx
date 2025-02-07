import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList.tsx';
import MoviesSearchPagination from './components/Pagination.tsx';
import { getMovies } from './services/movieService.ts'; 

const App: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null); // Réinitialiser les erreurs

      try {
        const data = await getMovies(page, 10, query);
        setMovies(data);
      } catch (err) {
        setError('Erreur lors de la récupération des films.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [query, page]);

  return (
    <div>
      <h1>Liste des Films</h1>
      <MoviesSearchPagination onSearch={setQuery} onPageChange={setPage} />
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <MoviesList movies={movies} />}
    </div>
  );
};

export default App;

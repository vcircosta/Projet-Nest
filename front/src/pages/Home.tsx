// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { getMovies } from '../services/movieService'; // Importer le service API
import MovieCard from '../components/MovieCard';  // Composant pour afficher chaque film
import Pagination from '../components/Pagination';  // Composant pour la pagination

const Home = () => {
  const [movies, setMovies] = useState<any[]>([]); // Liste des films
  const [loading, setLoading] = useState(false);  // Indicateur de chargement
  const [error, setError] = useState<string | null>(null); // Pour gérer les erreurs
  const [currentPage, setCurrentPage] = useState(1); // Page courante
  const [perPage, setPerPage] = useState(5); // Nombre de films par page
  const [search, setSearch] = useState(''); // Valeur de recherche

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovies(currentPage, perPage, search);  // Appel à l'API
        setMovies(data);
      } catch (err) {
        setError('Erreur lors du chargement des films.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies(); // Appeler la fonction pour récupérer les films
  }, [currentPage, perPage, search]); // Relancer la requête si un paramètre change

  // Fonction pour gérer le changement de page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Fonction pour gérer le changement du nombre de films par page
  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <h1>Liste des Films</h1>
      
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un film..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Affichage des films */}
      {loading && <p>Chargement...</p>}
      {error && <p>{error}</p>}
      <div className="movies-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage} 
        perPage={perPage} 
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  );
};

export default Home;

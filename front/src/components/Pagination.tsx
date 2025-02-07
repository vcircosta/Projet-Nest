import React, { useState } from 'react';

interface PaginationProps {
  onSearch: (query: string) => void;
  onPageChange: (page: number) => void;
}

const MoviesSearchPagination: React.FC<PaginationProps> = ({ onSearch, onPageChange }) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1); // Ajout de la gestion locale de la page

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      onPageChange(newPage);
    }
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    onPageChange(newPage);
  };

  return (
    <div>
      {/* Champ de recherche */}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit">Rechercher</button>
      </form>

      {/* Boutons de pagination */}
      <button onClick={handlePrevPage} disabled={page === 1}>
        Précédent
      </button>
      <span> Page {page} </span>
      <button onClick={handleNextPage}>Suivant</button>
    </div>
  );
};

export default MoviesSearchPagination;

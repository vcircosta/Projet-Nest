import api from './api.ts';  

export const getMovies = async (page: number, perPage: number, search: string) => {
  try {
    const response = await api.get('/movies', {
      params: { page, perPage, search },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
    throw error;
  }
};

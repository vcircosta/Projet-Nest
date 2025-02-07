import api from './api';

export const fetchUserReservations = async () => {
  const response = await api.get('/reservations/my');
  return response.data;
};

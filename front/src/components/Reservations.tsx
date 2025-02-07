import React, { useEffect, useState } from 'react';
import { fetchUserReservations } from '../services/ReservationService';

interface Reservation {
  id: number;
  movieTitle: string;
  date: string;
}

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]); // ✅ Définition du type
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const data: Reservation[] = await fetchUserReservations(); // ✅ Type explicite
        setReservations(data);
      } catch (err) {
        setError('Unauthorized - Please login');
      }
    };
    loadReservations();
  }, []);

  return (
    <div>
      <h2>My Reservations</h2>
      {error ? <p style={{ color: 'red' }}>{error}</p> : (
        <ul>
          {reservations.map((res) => (
            <li key={res.id}>{res.movieTitle} - {res.date}</li> // ✅ Plus d'erreur TypeScript
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reservations;

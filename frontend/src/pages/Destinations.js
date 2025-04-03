import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Destinations = () => {
  const { token } = useAuth();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Mock API call or fetch from backend
    setDestinations([
      { id: 1, name: 'Paris', details: 'Eiffel Tower, Louvre' },
      { id: 2, name: 'Tokyo', details: 'Shibuya, Temples' },
    ]);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Destinations</h2>
      <ul>
        {destinations.map((dest) => (
          <li key={dest.id} className="mb-2">
            {dest.name} - {dest.details}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Destinations;

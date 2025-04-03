import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TripForm from './TripForm';
import TripList from './TripList'; // Added import for TripList

const Trips = () => {
  const { token } = useAuth();
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/trips', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch trips');
      const data = await res.json();
      setTrips(data);
    } catch (error) {
      console.error('Error fetching trips:', error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Trips</h2>
      <TripForm trips={trips} setTrips={setTrips} editingTrip={editingTrip} setEditingTrip={setEditingTrip} />
      <TripList trips={trips} setTrips={setTrips} setEditingTrip={setEditingTrip} />
    </div>
  );
};

export default Trips;

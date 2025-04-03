import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TripForm from './TripForm'; // Ensure this matches your file structure

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

  const handleEdit = (trip) => setEditingTrip(trip);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/trips/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete trip');
      fetchTrips();
    } catch (error) {
      console.error('Error deleting trip:', error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Trips</h2>
      <TripForm trips={trips} setTrips={setTrips} editingTrip={editingTrip} setEditingTrip={setEditingTrip} />
      <ul className="space-y-4">
        {trips.map((trip) => (
          <li key={trip._id} className="flex justify-between items-center p-4 bg-gray-100 rounded">
            <div>
              <p className="font-medium">{trip.destination}</p>
              <p className="text-sm text-gray-600">
                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
              </p>
              {trip.description && <p className="text-sm text-gray-500">{trip.description}</p>}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(trip)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(trip._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trips;

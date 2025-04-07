import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001',
});

const TripList = ({ trips, setTrips, setEditingTrip }) => {
  const { token } = useAuth();

  const handleDelete = async (tripId) => {
    try {
      await axiosInstance.delete(`/api/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips(trips.filter((trip) => trip._id !== tripId));
    } catch (error) {
      alert('Failed to delete trip.');
    }
  };

  return (
    <div>
      {trips.map((trip) => (
        <div key={trip._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{trip.name || 'Untitled Trip'}</h2>
          <p className="font-medium">{trip.destination}</p>
          <p>{trip.description || 'No description'}</p>
          <p className="text-sm text-gray-500">
            Dates: {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
          </p>
          <div className="mt-2">
            <button
              onClick={() => setEditingTrip(trip)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(trip._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripList;
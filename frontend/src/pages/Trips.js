import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Trips = () => {
  const { token } = useAuth();
  const [trips, setTrips] = useState([]);
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const res = await fetch('http://localhost:5001/api/trips', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTrips(data);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `http://localhost:5001/api/trips/${editId}` : 'http://localhost:5001/api/trips';
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ destination, startDate, endDate }),
    });
    fetchTrips();
    setDestination('');
    setStartDate('');
    setEndDate('');
    setEditId(null);
  };

  const handleEdit = (trip) => {
    setEditId(trip._id);
    setDestination(trip.destination);
    setStartDate(trip.startDate.split('T')[0]);
    setEndDate(trip.endDate.split('T')[0]);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5001/api/trips/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTrips();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Trips</h2>
      <form onSubmit={handleAddOrUpdate} className="mb-6 flex space-x-4">
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          className="p-2 border rounded flex-1"
          required
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {editId ? 'Update' : 'Add'} Trip
        </button>
      </form>
      <ul className="space-y-4">
        {trips.map((trip) => (
          <li key={trip._id} className="flex justify-between items-center p-4 bg-gray-100 rounded">
            <div>
              <p className="font-medium">{trip.destination}</p>
              <p className="text-sm text-gray-600">
                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(trip)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(trip._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
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

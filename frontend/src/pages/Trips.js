import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Trips = () => {
  const { user, token } = useAuth();
  const [trips, setTrips] = useState([]);
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  const handleAddTrip = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5001/api/trips', {
      method: 'POST',
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
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">My Trips</h2>
      <form onSubmit={handleAddTrip} className="mb-6">
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          className="p-2 border rounded mr-2"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add Trip
        </button>
      </form>
      <ul>
        {trips.map((trip) => (
          <li key={trip._id} className="mb-2">
            {trip.destination} ({trip.startDate} - {trip.endDate})
            {/* Add Update/Delete buttons here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trips;

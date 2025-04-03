import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TripForm = ({ trips, setTrips, editingTrip, setEditingTrip }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: '', destination: '', startDate: '', endDate: '', description: '' });

  useEffect(() => {
    if (editingTrip) {
      setFormData({
        name: editingTrip.name || '',
        destination: editingTrip.destination,
        startDate: editingTrip.startDate.split('T')[0], // Format for date input
        endDate: editingTrip.endDate.split('T')[0],     // Format for date input
        description: editingTrip.description || '',
      });
    } else {
      setFormData({ name: '', destination: '', startDate: '', endDate: '', description: '' });
    }
  }, [editingTrip]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTrip) {
        const response = await axiosInstance.put(`/api/trips/${editingTrip._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTrips(trips.map((trip) => (trip._id === response.data._id ? response.data : trip)));
      } else {
        const response = await axiosInstance.post('/api/trips', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTrips([...trips, response.data]);
      }
      setEditingTrip(null);
      setFormData({ name: '', destination: '', startDate: '', endDate: '', description: '' });
    } catch (error) {
      alert('Failed to save trip.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingTrip ? 'Edit Trip' : 'Add Trip'}</h1>
      <input
        type="text"
        placeholder="Trip Name (optional)"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Destination"
        value={formData.destination}
        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="date"
        placeholder="Start Date"
        value={formData.startDate}
        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="date"
        placeholder="End Date"
        value={formData.endDate}
        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-200">
        {editingTrip ? 'Update Trip' : 'Add Trip'}
      </button>
    </form>
  );
};

export default TripForm;

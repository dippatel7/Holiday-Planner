import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Share = () => {
  const { token } = useAuth();
  const [email, setEmail] = useState('');
  const [tripId, setTripId] = useState('');

  const handleShare = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5001/api/trips/share', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tripId, email }),
    });
    setEmail('');
    setTripId('');
  };

  const handleExport = async () => {
    // Simulate PDF export (backend needed)
    window.alert('Exporting PDF... (Backend implementation pending)');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Share Plans</h2>
      <form onSubmit={handleShare} className="mb-6">
        <input
          type="text"
          value={tripId}
          onChange={(e) => setTripId(e.target.value)}
          placeholder="Trip ID"
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Recipient Email"
          className="w-full p-2 border rounded mb-4"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Share via Email
        </button>
      </form>
      <button
        onClick={handleExport}
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Export as PDF
      </button>
    </div>
  );
};

export default Share;

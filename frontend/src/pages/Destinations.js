import { useState, useEffect } from 'react';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Mock data (replace with backend API later)
    setDestinations([
      { id: 1, name: 'Paris', details: 'Eiffel Tower, Louvre Museum' },
      { id: 2, name: 'Tokyo', details: 'Shibuya Crossing, Senso-ji Temple' },
      { id: 3, name: 'New York', details: 'Statue of Liberty, Times Square' },
    ]);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Destination Recommendations</h2>
      <ul className="space-y-4">
        {destinations.map((dest) => (
          <li key={dest.id} className="p-4 bg-gray-100 rounded">
            <p className="font-medium">{dest.name}</p>
            <p className="text-gray-600">{dest.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Destinations;

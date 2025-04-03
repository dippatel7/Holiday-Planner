import { useState } from 'react';

const Share = () => {
  const [message, setMessage] = useState('');

  const handleExport = async () => {
    // Placeholder for PDF export (requires backend implementation later)
    setMessage('Exporting as PDF... (Feature in progress)');
    setTimeout(() => setMessage(''), 3000); // Clear message after 3s
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Share Plans</h2>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <button
        onClick={handleExport}
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-200"
      >
        Export as PDF
      </button>
    </div>
  );
};

export default Share;

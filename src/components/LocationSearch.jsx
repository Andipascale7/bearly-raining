import { useState } from 'react';

function LocationSearch({ onLocationChange }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onLocationChange(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city name (e.g. London, Paris)"
          className="flex-1 px-4 py-2 rounded-lg border-2 border-white/30 bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-white"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default LocationSearch;
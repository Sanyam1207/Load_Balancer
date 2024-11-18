import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [dogImages, setDogImages] = useState([]);
  const [numberOfImages, setNumberOfImages] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDogImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8000/dog?count=${numberOfImages}`);
      console.log('Response:', response.data);
      
      if (response.data.images && Array.isArray(response.data.images)) {
        setDogImages(response.data.images);
      } else {
        setError('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching dog images:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Random Dog Images</h1>
      <div className="flex items-center justify-center mb-6">
        <label className="mr-4">
          Number of Images:
          <input 
            type="number" 
            value={numberOfImages} 
            onChange={(e) => setNumberOfImages(Math.max(parseInt(e.target.value)))}
            className="ml-2 w-20 p-2 border rounded"
          />
        </label>
        <button 
          onClick={fetchDogImages} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Dog Images'}
        </button>
      </div>

      {error && (
        <div className="text-red-500 mb-4">Error: {error}</div>
      )}

      <div className="flex flex-wrap justify-center gap-4">
        {dogImages.map((image, index) => (
          <div key={index} className="relative group">
            <img 
              src={image.url} 
              alt={`Dog ${index + 1}`} 
              className="w-64 h-64 object-cover rounded-lg shadow-md"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black bg-opacity-75 text-white p-2 rounded">
                {image.port}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
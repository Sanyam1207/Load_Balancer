import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [dogImage, setDogImage] = useState('');

  const fetchDogImage = async () => {
    try {
      const response = await axios.get('http://localhost:8080');
      setDogImage(response.data.imageUrl);
    } catch (error) {
      console.error('Error fetching dog image:', error);
    }
  };

  return (
    <div>
      <h1>Random Dog Images</h1>
      <button onClick={fetchDogImage}>Get Dog Image</button>
      {dogImage && <img src={dogImage} alt="Dog" style={{ width: '300px', height: '300px' }} />}
    </div>
  );
};

export default App;

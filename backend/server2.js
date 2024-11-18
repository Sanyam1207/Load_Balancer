const express = require('express');
const axios = require('axios');
const cors = require('cors');

console.log("got the request at server 2");

const app = express();
app.use(cors())
const PORT = process.env.PORT || 3001;

app.get('/', async (req, res) => {
  try {
    console.log("got the request at server 2");
    
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    console.log(response.data);
    res.json({
      success: true,
      message: 'Random dog image fetched successfully!',
      responseFrom: 'Response from port 3001',
      data: response.data, // Include the original data from the API
    });
  } catch (error) {
    res.status(500).send('Error fetching dog image');
    console.log(error)

  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

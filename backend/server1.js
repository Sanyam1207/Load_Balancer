const express = require('express');
const axios = require('axios');
const cors = require('cors');
console.log("got the request at server 1");


const app = express();
app.use(cors())
const PORT = process.env.PORT || 3005;

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    console.log(response.data);
    console.log("got the request at server 1");
    res.json({
      success: true,
      message: 'Random dog image fetched successfully!',
      responseFrom: 'Response from port 3005',
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

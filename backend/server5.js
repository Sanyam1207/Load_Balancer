const express = require('express');
const cors = require('cors');
const axios = require('axios');
console.log("got the request at server 5");


const app = express();
app.use(cors())
const PORT = process.env.PORT || 3006;

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    res.json({
      success: true,
      message: 'Random dog image fetched successfully!',
      responseFrom: `Response from port ${PORT}`,
      imageUrl: response.data.message
    });
  } catch (error) {
    res.status(500).send('Error fetching dog image');
    console.log(error)
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

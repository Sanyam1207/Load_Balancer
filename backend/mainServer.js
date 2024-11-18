const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

app.post('/dog', async (req, res) => {
    const { algorithm, count } = req.body; // Expecting "roundRobin" or "leastConnections"
    console.log(algorithm);
    

    if (!algorithm || (algorithm !== 'roundrobin' && algorithm !== 'leastcount')) {
        return res.status(400).json({ error: 'Invalid algorithm type. Use "roundRobin" or "leastConnections".' });
    }
    
    try {
        if (algorithm === "roundrobin") {
            const response = await axios.get(`http://localhost:8000/dog?count=${count || 1}`)
            res.json({
                data: response.data
            })
        }

        if (algorithm === "leastcount") {
            const response = await axios.get(`http://localhost:8002/dog?count=${count || 1}`)
            res.json({
                data: response.data
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: error, error: 'Internal Server Error' });
    }
    
});

// Start the main server
const PORT = 8004;
app.listen(PORT, () => console.log(`Main server running on port ${PORT}`));

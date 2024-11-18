const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const dbconnect = require("../db/dbConfig")
const auth = require("../router/authRouter")

const app = express();

const servers = [
    { host: 'http://localhost', port: 3001 },
    { host: 'http://localhost', port: 3006 },
    { host: 'http://localhost', port: 3003 },
    { host: 'http://localhost', port: 3004 },
    { host: 'http://localhost', port: 3005 },
];



app.use(bodyParser.json())
app.use(cors()); // Enable CORS for all routes

let current = 0;
app.get('/dog', async (req, res) => {
    const count = parseInt(req.query.count, 10) || 1; // Default to 1 if not specified
    console.log(count);
    
    const imagePromises = [];

    try {
        // Distribute requests across servers using round-robin logic
        for (let i = 0; i < count; i++) {
            const target = servers[current];
            current = (current + 1) % servers.length; // Rotate to the next server
            const url = `${target.host}:${target.port}/`;

            // Push the request to the promise array
            const response = await axios.get(url)
            imagePromises.push(response);
        }

        // Wait for all requests to complete
        const responses = await Promise.all(imagePromises);
        const images = responses.map((response) => response.data);

        // Return the collected images and metadata
        res.json({
            success: true,
            message: `${count} dog images fetched successfully!`,
            responseFrom: 'Load Balancer',
            data: images,
        });
    } catch (error) {
        console.error('Error forwarding requests:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch data from servers',
            error: error.message,
        });
    }
});

app.listen(8000, () => console.log('Load balancer running on port 8000'));

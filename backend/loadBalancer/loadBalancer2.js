const express = require('express');
const app = express();
const axios = require('axios');

const servers = [
    { host: 'http://localhost', port: 3001, connections: 0 },
    { host: 'http://localhost', port: 3006, connections: 0 },
    { host: 'http://localhost', port: 3003, connections: 0 },
    { host: 'http://localhost', port: 3004, connections: 0 },
    { host: 'http://localhost', port: 3005, connections: 0 },
];

app.get('/dog', async (req, res) => {
    const count = parseInt(req.query.count, 10) || 1; // Default to 1 if not specified
    const imagePromises = [];

    try {
        // Distribute requests across servers using round-robin logic
        for (let i = 0; i < count; i++) {
            // Sort the servers based on the number of active connections
            servers.sort((a, b) => a.connections - b.connections);
            const target = servers[0]; // Pick the server with the least connections
            const url = `${target.host}:${target.port}/`;

            // Increment the connection count for the target server
            target.connections++;

            // Push the request promise to the array
            const requestPromise = axios.get(url)
                .then((response) => {
                    // Return the response and decrement connection count on success
                    target.connections--;
                    return {
                        ...response.data,
                        serverConnections: target.connections
                    };
                })
                .catch((error) => {
                    // Decrement connection count on error and rethrow the error
                    target.connections--;
                    throw error;
                });

            imagePromises.push(requestPromise);
        }
        console.log(imagePromises);


        // Wait for all requests to complete
        const responses = await Promise.all(imagePromises);
        // console.log(responses);

        const images = responses.map((response) => {
            return { data  : response.data, serverConnections: response.serverConnections };
        });
        console.log(images);


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

app.listen(8002, () => console.log('Load balancer running on port 8000'));
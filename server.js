// server.js (Simplified)
console.log('server.js is being executed'); // Add this line
import express from 'express';
//import cors from 'cors';

const app = express();
//app.use(cors());

const PORT = 8080;

app.get('/items', (req, res) => {
    res.send([{ id: 1, name: 'Test Item' }]); // Simple test data
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

export default app;
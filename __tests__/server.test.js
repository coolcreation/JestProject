import request from 'supertest';
import app from '../server.js'; // Ensure this path is correct

const PORT = Math.floor(Math.random() * (65535 - 1024) + 1024);
let server;

beforeAll((done) => {
    console.log('Starting server on port:', PORT);
    server = app.listen(PORT, (err) => {
        if (err) {
            console.error('Error starting server:', err);
            console.log('Server failed to start.');
            done(err);
            return;
        }
        console.log('Server started successfully on port:', PORT);
        console.log("done() about to be called");
        done();
    });
}, 10000);

it('should return items', async () => {
    const response = await request(server).get('/items'); // Use server instance
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0); // Add a check for at least one item
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
});

afterAll((done) => {
    if (server && server.listening) {
        server.close(done);
    } else {
        done(); // If the server didn't start, still call done()
    }
});
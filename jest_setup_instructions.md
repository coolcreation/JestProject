### Steps to setup Jest 

```js
mkdir projectName
cd projectName

npm install axios express cors

npm i jest-environment-jsdom -D 
npm i jest -D
npm i supertest -D
```

**If after install and test run it errors, try these:**  
- Make sure if statement prevents app server from running
- Make sure test server is serving a random PORT, with app server on fixed PORT
- If all else fails try this:  
npm install --save-dev @jest/globals

#### server.js
```js
// server.js
console.log('server.js is being executed');
import express from 'express';
import { fileURLToPath } from 'url'; // Import fileURLToPath

const app = express();
const PORT = 8080;

app.get('/items', (req, res) => {
    res.send([{ id: 1, name: 'Test Item' }]);
});

// Start the server only if this module is run directly
if (import.meta.url === fileURLToPath(import.meta.url)) {
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });
}

export default app;
```

#### package.json
```js
{
  "name": "jestproject",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "axios": "^1.7.9",
    "cors": "^2.8.5",
    "express": "^4.21.2"
  },
  "devDependencies": {
    "@jest/globals": "^29.7.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "supertest": "^7.0.0"
  },
  "jest": {
    "testEnvironment": "jsdom"
  }
}
```

#### __tests__ folder / server.test.js
```js
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
```
import app from '../src/app.js';
import supertest from 'supertest';

const request = supertest(app);

describe('GET /', () => {
    it('Gets the hello endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('hello world');
    });
});

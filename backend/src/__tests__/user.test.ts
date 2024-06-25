import app from '../app';
import supertest from 'supertest';
import session from 'supertest-session';
import mongoose from 'mongoose';
import { dropCollectionIfExists } from '../api/utils/db-utils';
import { describe, expect, beforeEach, afterEach, it } from "@jest/globals";
import { User } from '../api/schemas/user-schema';

const request = supertest(app);

beforeEach(async () => {
    const db_url = process.env.DB_URL;
    try {
        await mongoose.connect(String(db_url));
        console.log(`Database connected on ${db_url}`);
    } catch (error) {
        console.error(`Database connection error: ${error}`);
        throw error;
    }
});

afterEach(async () => {
    try {
        await dropCollectionIfExists('users', mongoose.connection);
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error during teardown:', error);
        throw error;
    }
});

const testUsers = {
    TEST_USER_1: {
        email: 'test1@test.com',
        username: 'test1',
        password: 'test1pass',
    },
    TEST_USER_2: {
        email: 'test2@test.com',
        username: 'test2',
        password: 'test2pass',
    },
    TEST_USER_3: {
        email: 'test3@test.com',
        username: 'test3',
        password: 'test3pass',
    },
};

describe('GET /user', () => {
    it('Gets the user endpoint', async () => {
        const response = await request.get('/user');
        expect(response.status).toBe(200);
    });

    it('Creates an account, logs in, then gets the logged in username', async () => {
        const sessionRequest = session(app);

        const response = await sessionRequest.post('/user/register').send(testUsers.TEST_USER_1);
        expect(response.status).toBe(200);

        const response2 = await sessionRequest.post('/user/login').send(testUsers.TEST_USER_1);
        expect(response2.status).toBe(200);
        expect(response2.body.headers.username).toBe(testUsers.TEST_USER_1.username);

        console.log(sessionRequest.cookies);

        const response3 = await sessionRequest.get('/user');
        expect(response3.status).toBe(200);
        expect(response3.body.headers.username).toBe(testUsers.TEST_USER_1.username);
    });
});

describe('POST /user/register', () => {
    it('Adds new user', async () => {
        const response = await request.post('/user/register').send(testUsers.TEST_USER_1);
        expect(response.status).toBe(200);
    });

    it('Fails to register a user with duplicate email', async () => {
        await request.post('/user/register').send(testUsers.TEST_USER_1);
        const response = await request.post('/user/register').send(testUsers.TEST_USER_1);
        expect(response.status).toBe(500);
    });

    it('Fails to register a user with invalid email', async () => {
        const invalidUser = { ...testUsers.TEST_USER_1, email: 'invalid-email' };
        const response = await request.post('/user/register').send(invalidUser);
        expect(response.status).toBe(400);
    });
});

describe('POST /user/login', () => {
    it('Adds new user and tries to login', async () => {
        const response = await request.post('/user/register').send(testUsers.TEST_USER_1);
        expect(response.status).toBe(200);

        const response2 = await request.post('/user/login').send(testUsers.TEST_USER_1);
        expect(response2.status).toBe(200);
    });

    it('Fails to login with incorrect password', async () => {
        await request.post('/user/register').send(testUsers.TEST_USER_1);
        const response = await request.post('/user/login').send({ ...testUsers.TEST_USER_1, password: 'wrongpass' });
        expect(response.status).toBe(400);
    });

    it('Fails to login with non-existent user', async () => {
        const response = await request.post('/user/login').send(testUsers.TEST_USER_2);
        expect(response.status).toBe(400);
    });

    it('Adds a user and creates a session', async () => {
        const sessionRequest = session(app);

        const response = await sessionRequest.post('/user/register').send(testUsers.TEST_USER_1);
        expect(response.status).toBe(200);

        const response2 = await sessionRequest.post('/user/login').send(testUsers.TEST_USER_1);
        expect(response2.status).toBe(200);
    });
});

describe('POST /user/logout', () => {
    it('Adds a user, logs in, then logs out', async () => {
        const sessionRequest = session(app);

        const response = await sessionRequest.post('/user/register').send(testUsers.TEST_USER_1);
        expect(response.status).toBe(200);

        const response2 = await sessionRequest.post('/user/login').send(testUsers.TEST_USER_1);
        expect(response2.status).toBe(200);
        
        const response3 = await sessionRequest.post('/user/logout').send();
        expect(response3.status).toBe(200);
    });
});

describe('POST /user', () => {
    it('Creates an account, logs in, then tests posting to user endpoint', async () => {
        const sessionRequest = session(app);

        const response = await sessionRequest.post('/user/register').send(testUsers.TEST_USER_1);
        expect(response.status).toBe(200);

        const response2 = await sessionRequest.post('/user/login').send(testUsers.TEST_USER_1);
        expect(response2.status).toBe(200);
        expect(response2.body.headers.username).toBe(testUsers.TEST_USER_1.username);

        console.log(sessionRequest.cookies);

        const response3 = await sessionRequest.post('/user');
        expect(response3.status).toBe(200);
        expect(response3.body.headers.username).toBe(testUsers.TEST_USER_1.username);
    });
});

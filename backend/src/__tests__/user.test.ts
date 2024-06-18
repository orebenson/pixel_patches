import app from '../app';
import supertest from 'supertest';
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
});

describe('POST /user/register', () => {
    it('Adds new user', async () => {
        const response = await request.post('/user/register').send(testUsers.TEST_USER_1);
        expect(response.status).toBe(200);
    });
});

describe('POST /user/login', () => {
    it('Adds new user and tries to login', async () => {
        const response = await request.post('/user/register').send(testUsers.TEST_USER_1);
        expect(response.status).toBe(200);

        const response2 = await request.post('/user/login').send(testUsers.TEST_USER_1);
        expect(response2.status).toBe(200);
    });
});


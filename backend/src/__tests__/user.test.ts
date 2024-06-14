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

describe('POST /user/add', () => {
    it('Adds new user', async () => {
        const response = await request.post('/user/add').send(testUsers.TEST_USER_1);
        expect(response.status).toBe(200);
    });
});


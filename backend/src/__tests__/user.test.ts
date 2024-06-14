import app from '../app';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { dropCollectionIfExists } from '../api/utils/db-utils';
import { describe, test, expect } from "@jest/globals";
// import { User } from '../src/api/schemas/user-schema';

const request = supertest(app);

beforeEach(async () => {
    const db_url : string = String(process.env.DB_URL);
    await mongoose.connect(db_url).then(
        async () => {
            console.log(`Database connected on ${db_url}`);
        },
        error => { console.log(`Database connection error: ${error}`); throw error; }
    )
});

afterEach(async () => {
    await dropCollectionIfExists('users', mongoose.connection).then(
        async () => { await mongoose.connection.close() }
    )
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


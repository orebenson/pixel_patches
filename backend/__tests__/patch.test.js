import app from '../app';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { dropCollectionIfExists } from '../api/utils/dbUtils.js';
import { Patch } from '../api/schemas/patchSchema.js';

const request = supertest(app);

beforeEach(async () => {
    const db_url = process.env.DB_URL;
    await mongoose.connect(db_url).then(
        async () => {
            console.log(`Database connected on ${db_url}`);
        },
        error => { console.log(`Database connection error: ${error}`); throw error; }
    )
});

afterEach(async () => {
    await dropCollectionIfExists('patches', mongoose.connection).then(
        async () => { await mongoose.connection.close() }
    )
});

describe('POST /patch/add', () => {
    it('Adds a new patch', async () => {
        const response = await request.post('/patch/add').send({ patchPixelHexes: ['#FFFFFF', '#000000'] });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('success saving patch');

        const patch = await Patch.findOne({ patchPixelHexes: ['#FFFFFF', '#000000'] });
        expect(patch).not.toBeNull();
        expect(patch.patchPixelHexes).toEqual(['#FFFFFF', '#000000']);
    });
});

describe('POST /patch/add', () => {
    it('Adds two different patches, that share a colour', async () => {
        const response = await request.post('/patch/add').send({ patchPixelHexes: ['#FFFFFF', '#000000'] });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('success saving patch');

        const response2 = await request.post('/patch/add').send({ patchPixelHexes: ['#FFFFFF', '#FFFFFF'] });
        expect(response2.status).toBe(200);
        expect(response2.body.message).toBe('success saving patch');
    });
});

describe('POST /patch/add', () => {
    it('Adds two different patches, that dont share a colour', async () => {
        const response = await request.post('/patch/add').send({ patchPixelHexes: ['#FFFFFF', '#FFFFFF'] });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('success saving patch');

        const response2 = await request.post('/patch/add').send({ patchPixelHexes: ['#000000', '#000000'] });
        expect(response2.status).toBe(200);
        expect(response2.body.message).toBe('success saving patch');
    });
});

describe('POST /patch/add', () => {
    it('Tries to add duplicate patches', async () => {
        const response = await request.post('/patch/add').send({ patchPixelHexes: ['#FFFFFF', '#000000'] });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('success saving patch');

        const response2 = await request.post('/patch/add').send({ patchPixelHexes: ['#FFFFFF', '#000000'] });
        expect(response2.status).toBe(500);
        expect(response2.body.message).toBe('error saving patch');
    });
});

describe('GET /patch/list', () => {
    it('Gets the list of patches', async () => {
        await Patch({ patchPixelHexes: ['#FFFFFF', '#000000'] }).save();

        const response = await request.get('/patch/list');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('success getting patches');
        expect(response.body.data).toEqual(expect.arrayContaining([
            expect.objectContaining({ patchPixelHexes: ['#FFFFFF', '#000000'] })
        ]));
    });
});

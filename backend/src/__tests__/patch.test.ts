import app from '../app';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { dropCollectionIfExists } from '../api/utils/db-utils';
import { Patch } from '../api/schemas/patch-schema';
import { describe, expect, beforeEach, afterEach, it } from "@jest/globals";

const testHexArrays = {
    HEX_ARRAY_1: Array(64).fill('#000000'),
    HEX_ARRAY_2: Array(64).fill('#ffffff'),
    HEX_ARRAY_3: [
        ...Array(48).fill('#c70039'),
        ...Array(16).fill('#ff5733')
    ]
};

function generateHexArray(array_id, index) {
    const arrayPatterns = {
        1: ["#000000", "#fffff", "#000000", "#fffff"],
        2: ["#ffffff", "#fffff", "#aaaaaa", "#fffff"]
    };

    const pattern = arrayPatterns[array_id];
    const result : string[] = [];
    const repeatCount = 16;

    if (pattern) {
        for (let i = 0; i < repeatCount; i++) {
            pattern.forEach(color => {
                result.push(`${color}${index}`);
            });
        }
    }

    return result;
}


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
        await dropCollectionIfExists('patches', mongoose.connection);
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error during teardown:', error);
        throw error;
    }
});


describe('POST /patch/add', () => {
    it('Adds a new patch', async () => {
        const response = await request.post('/patch/add').send({ patchPixelHexes: testHexArrays.HEX_ARRAY_1 });
        expect(response.status).toBe(200);

        await new Promise(resolve => setTimeout(resolve, 2000));

        const patch = await Patch.findOne({ patchPixelHexes: testHexArrays.HEX_ARRAY_1 });
        expect(patch).not.toBeNull();
        expect(patch?.patchPixelHexes).toEqual(testHexArrays.HEX_ARRAY_1);
    });

    it('Adds two different patches, that share a colour', async () => {
        const response = await request.post('/patch/add').send({ patchPixelHexes: testHexArrays.HEX_ARRAY_1 });
        expect(response.status).toBe(200);

        const response2 = await request.post('/patch/add').send({ patchPixelHexes: testHexArrays.HEX_ARRAY_2 });
        expect(response2.status).toBe(200);
    });

    it('Adds two different patches, that dont share a colour', async () => {
        const response = await request.post('/patch/add').send({ patchPixelHexes: testHexArrays.HEX_ARRAY_2 });
        expect(response.status).toBe(200);

        const response2 = await request.post('/patch/add').send({ patchPixelHexes: testHexArrays.HEX_ARRAY_3 });
        expect(response2.status).toBe(200);
    });

    it('Tries to add duplicate patches', async () => {
        const response = await request.post('/patch/add').send({ patchPixelHexes: testHexArrays.HEX_ARRAY_1 });
        expect(response.status).toBe(200);

        const response2 = await request.post('/patch/add').send({ patchPixelHexes: testHexArrays.HEX_ARRAY_1 });
        expect(response2.status).toBe(500);
    });

    it('Returns error for invalid patchPixelHexes (wrong length)', async () => {
        const invalidHexArray = testHexArrays.HEX_ARRAY_1.slice(0, 10)
        const response = await request.post('/patch/add').send({ patchPixelHexes: invalidHexArray });
        expect(response.status).toBe(400);
    });

    it('Returns error for invalid patchPixelHexes (not an array)', async () => {
        const invalidHexArray = "not-an-array";
        const response = await request.post('/patch/add').send({ patchPixelHexes: invalidHexArray });
        expect(response.status).toBe(400);
    });
});


describe('GET /patch/list', () => {
    it('Gets the list of patches', async () => {
        await new Patch({ patchPixelHexes: testHexArrays.HEX_ARRAY_1 }).save();

        const response = await request.get('/patch/list');
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(expect.arrayContaining([
            expect.objectContaining({ patchPixelHexes: testHexArrays.HEX_ARRAY_1 })
        ]));
    });

    it('Gets the list of multiple patches', async () => {
        const response1 = await request.post('/patch/add').send({ patchPixelHexes: testHexArrays.HEX_ARRAY_2 });
        expect(response1.status).toBe(200);

        const response2 = await request.post('/patch/add').send({ patchPixelHexes: testHexArrays.HEX_ARRAY_3 });
        expect(response2.status).toBe(200);

        const response3 = await request.get('/patch/list');
        expect(response3.status).toBe(200);
        expect(response3.body.data).toEqual(expect.arrayContaining([
            expect.objectContaining({ patchPixelHexes: testHexArrays.HEX_ARRAY_2 })
        ]));
        expect(response3.body.data).toEqual(expect.arrayContaining([
            expect.objectContaining({ patchPixelHexes: testHexArrays.HEX_ARRAY_3 })
        ]));
    });

    it('Returns empty list when no patches exist', async () => {
        const response = await request.get('/patch/list');
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual([]);
    });
});

describe('GET /patch/list/:start_index/:end_index', () => {
    it('Gets the list of patches from index 0 to 10', async () => {
        for (let i = 0; i < 10; i++) {
            await new Patch({ patchPixelHexes: generateHexArray(1, i) }).save()
        }

        const response = await request.get('/patch/list/0/10');
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(10);
        for (let i = 0; i < 10; i++) {
            expect(response.body.data).toEqual(expect.arrayContaining([
                expect.objectContaining({ patchPixelHexes: generateHexArray(1, i) })
            ]));
        }
    });

    it('Returns empty list when start_index equals end_index', async () => {
        for (let i = 0; i < 10; i++) {
            await new Patch({ patchPixelHexes: generateHexArray(1, i) }).save()
        }
        const response = await request.get('/patch/list/5/5');
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual([]);
    });

    it('Returns partial list of patches', async () => {
        for (let i = 0; i < 5; i++) {
            await new Patch({ patchPixelHexes: generateHexArray(1, i) }).save();
        }

        const response = await request.get('/patch/list/0/10');
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(5);
    });

    it('Returns error for invalid start_index (negative)', async () => {
        const response = await request.get('/patch/list/-1/10');
        expect(response.status).toBe(400);
    });

    it('Returns error for invalid end_index (negative)', async () => {
        const response = await request.get('/patch/list/0/-10');
        expect(response.status).toBe(400);
    });

    it('Returns error for invalid start_index (non-integer)', async () => {
        const response = await request.get('/patch/list/start/10');
        expect(response.status).toBe(400);
    });

    it('Returns error for invalid end_index (non-integer)', async () => {
        const response = await request.get('/patch/list/0/end');
        expect(response.status).toBe(400);
    });

    it('Returns empty list when no patches exist', async () => {
        const response = await request.get('/patch/list/0/10');
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual([]);
    });

    it('Returns error when end_index is less than start_index', async () => {
        const response = await request.get('/patch/list/10/5');
        expect(response.status).toBe(500);
    });
});

describe('GET /patch/list/count', () => {
    it('Gets the count of patches', async () => {
        for (let i = 0; i < 10; i++) {
            await new Patch({ patchPixelHexes: generateHexArray(1, i) }).save()
        }

        const response = await request.get('/patch/list/count');
        expect(response.status).toBe(200);
        expect(response.body.data.patchCount).toBe(10);
    });

    it('Returns count of 0 when no patches exist', async () => {
        const response = await request.get('/patch/list/count');
        expect(response.status).toBe(200);
        expect(response.body.data.patchCount).toBe(0);
    });
});

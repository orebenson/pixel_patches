import app from '../app';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { dropCollectionIfExists } from '../api/utils/db-utils.js';
import { Patch } from '../api/schemas/patch-schema.js';


const testHexArrays = {
    HEX_ARRAY_1: [
        '#000000', '#000000', '#000000', '#000000',
        '#000000', '#000000', '#000000', '#000000',
        '#000000', '#000000', '#000000', '#000000',
        '#000000', '#000000', '#000000', '#000000',
        '#000000', '#000000', '#000000', '#000000',
        '#000000', '#000000', '#000000', '#000000',
        '#000000', '#000000', '#000000', '#000000',
        '#000000', '#000000', '#000000', '#000000',
        '#000000', '#000000', '#000000', '#000000',
        '#000000', '#000000', '#000000', '#000000',
        '#000000', '#000000', '#000000', '#000000',
        '#000000', '#000000', '#000000', '#000000',
        '#000000', '#000000', '#000000', '#000000',
        '#000000', '#000000', '#000000', '#000000',
        '#000000', '#000000', '#000000', '#000000',
        '#000000', '#000000', '#000000', '#000000'
    ],
    HEX_ARRAY_2: [
        '#ffffff', '#ffffff', '#ffffff', '#ffffff',
        '#ffffff', '#ffffff', '#ffffff', '#ffffff',
        '#ffffff', '#ffffff', '#ffffff', '#ffffff',
        '#ffffff', '#ffffff', '#ffffff', '#ffffff',
        '#ffffff', '#ffffff', '#ffffff', '#ffffff',
        '#ffffff', '#ffffff', '#ffffff', '#ffffff',
        '#ffffff', '#ffffff', '#ffffff', '#ffffff',
        '#ffffff', '#ffffff', '#ffffff', '#ffffff',
        '#ffffff', '#ffffff', '#ffffff', '#ffffff',
        '#ffffff', '#ffffff', '#ffffff', '#ffffff',
        '#ffffff', '#ffffff', '#ffffff', '#ffffff',
        '#ffffff', '#ffffff', '#ffffff', '#ffffff',
        '#ffffff', '#ffffff', '#ffffff', '#ffffff',
        '#ffffff', '#ffffff', '#ffffff', '#ffffff',
        '#ffffff', '#ffffff', '#ffffff', '#ffffff',
        '#ffffff', '#ffffff', '#ffffff', '#ffffff'
    ],
    HEX_ARRAY_3: [
        '#c70039', '#c70039', '#c70039', '#c70039',
        '#c70039', '#c70039', '#c70039', '#c70039',
        '#c70039', '#c70039', '#c70039', '#c70039',
        '#c70039', '#c70039', '#c70039', '#c70039',
        '#c70039', '#c70039', '#c70039', '#c70039',
        '#c70039', '#c70039', '#c70039', '#c70039',
        '#c70039', '#c70039', '#c70039', '#c70039',
        '#c70039', '#c70039', '#c70039', '#c70039',
        '#c70039', '#c70039', '#c70039', '#c70039',
        '#c70039', '#c70039', '#c70039', '#c70039',
        '#c70039', '#c70039', '#c70039', '#c70039',
        '#c70039', '#c70039', '#c70039', '#c70039',
        '#ff5733', '#ff5733', '#ff5733', '#ff5733',
        '#ff5733', '#ff5733', '#ff5733', '#ff5733',
        '#ff5733', '#ff5733', '#ff5733', '#ff5733',
        '#ff5733', '#ff5733', '#ff5733', '#ff5733'
    ]
}

function generateHexArray(array_id, index) {
    if (array_id === 1) {
        return [
            `#000000${index}`, `#fffff${index}`, `#000000${index}`, `#fffff${index}`,
            `#000000${index}`, `#fffff${index}`, `#000000${index}`, `#fffff${index}`,
            `#000000${index}`, `#fffff${index}`, `#000000${index}`, `#fffff${index}`,
            `#000000${index}`, `#fffff${index}`, `#000000${index}`, `#fffff${index}`,
            `#000000${index}`, `#fffff${index}`, `#000000${index}`, `#fffff${index}`,
            `#000000${index}`, `#fffff${index}`, `#000000${index}`, `#fffff${index}`,
            `#000000${index}`, `#fffff${index}`, `#000000${index}`, `#fffff${index}`,
            `#000000${index}`, `#fffff${index}`, `#000000${index}`, `#fffff${index}`,
            `#000000${index}`, `#fffff${index}`, `#000000${index}`, `#fffff${index}`,
            `#000000${index}`, `#fffff${index}`, `#000000${index}`, `#fffff${index}`,
            `#000000${index}`, `#fffff${index}`, `#000000${index}`, `#fffff${index}`,
            `#000000${index}`, `#fffff${index}`, `#000000${index}`, `#fffff${index}`,
            `#000000${index}`, `#fffff${index}`, `#000000${index}`, `#fffff${index}`,
            `#000000${index}`, `#fffff${index}`, `#000000${index}`, `#fffff${index}`,
            `#000000${index}`, `#fffff${index}`, `#000000${index}`, `#fffff${index}`,
            `#000000${index}`, `#fffff${index}`, `#000000${index}`, `#fffff${index}`
        ]
    }

    if (array_id === 2) {
        return [
            `#ffffff${index}`, `#fffff${index}`, `#aaaaaa${index}`, `#fffff${index}`,
            `#ffffff${index}`, `#fffff${index}`, `#aaaaaa${index}`, `#fffff${index}`,
            `#ffffff${index}`, `#fffff${index}`, `#aaaaaa${index}`, `#fffff${index}`,
            `#ffffff${index}`, `#fffff${index}`, `#aaaaaa${index}`, `#fffff${index}`,
            `#ffffff${index}`, `#fffff${index}`, `#aaaaaa${index}`, `#fffff${index}`,
            `#ffffff${index}`, `#fffff${index}`, `#aaaaaa${index}`, `#fffff${index}`,
            `#ffffff${index}`, `#fffff${index}`, `#aaaaaa${index}`, `#fffff${index}`,
            `#ffffff${index}`, `#fffff${index}`, `#aaaaaa${index}`, `#fffff${index}`,
            `#ffffff${index}`, `#fffff${index}`, `#aaaaaa${index}`, `#fffff${index}`,
            `#ffffff${index}`, `#fffff${index}`, `#aaaaaa${index}`, `#fffff${index}`,
            `#ffffff${index}`, `#fffff${index}`, `#aaaaaa${index}`, `#fffff${index}`,
            `#ffffff${index}`, `#fffff${index}`, `#aaaaaa${index}`, `#fffff${index}`,
            `#ffffff${index}`, `#fffff${index}`, `#aaaaaa${index}`, `#fffff${index}`,
            `#ffffff${index}`, `#fffff${index}`, `#aaaaaa${index}`, `#fffff${index}`,
            `#ffffff${index}`, `#fffff${index}`, `#aaaaaa${index}`, `#fffff${index}`,
            `#ffffff${index}`, `#fffff${index}`, `#aaaaaa${index}`, `#fffff${index}`
        ]
    }
}



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
        const response = await request.post('/patch/add').send({ patchPixelHexes: testHexArrays.HEX_ARRAY_1 });
        expect(response.status).toBe(200);

        const patch = await Patch.findOne({ patchPixelHexes: testHexArrays.HEX_ARRAY_1 });
        expect(patch).not.toBeNull();
        expect(patch.patchPixelHexes).toEqual(testHexArrays.HEX_ARRAY_1);
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
});


describe('GET /patch/list', () => {
    it('Gets the list of patches', async () => {
        await Patch({ patchPixelHexes: testHexArrays.HEX_ARRAY_1 }).save();

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
});




describe('GET /patch/list/:start_index/:end_index', () => {
    it('Gets the list of patches from index 0 to 10', async () => {
        for (let i = 0; i < 10; i++) {
            await Patch({ patchPixelHexes: generateHexArray(1, i) }).save()
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

    it('Returns an error for getting patches from index 0 to 15 when only 10 exist', async () => {
        for (let i = 0; i < 10; i++) {
            await Patch({ patchPixelHexes: generateHexArray(1, i) }).save()
        }

        const response = await request.get('/patch/list/0/15');
        expect(response.status).toBe(500);
    });
});

describe('GET /patch/list/count', () => {
    it('Gets the count of patches', async () => {
        for (let i = 0; i < 10; i++) {
            await Patch({ patchPixelHexes: generateHexArray(1, i) }).save()
        }

        const response = await request.get('/patch/list/count');
        expect(response.status).toBe(200);
        expect(response.body.data.patchCount).toBe(10);
    });
});

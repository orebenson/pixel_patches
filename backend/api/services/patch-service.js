import { Patch } from '../schemas/patch-schema.js';

export async function addPatch(params) {
    const patchPixelHexes = params.patchPixelHexes;
    try {
        if (patchPixelHexes.length !== 64) {
            throw new Error('length of patchPixelHexes must be 64');
        }
        const patch = new Patch({
            patchPixelHexes: patchPixelHexes
        });
        await patch.save();
        return { status: 'success', message: 'success saving patch' };
    } catch (error) {
        console.log(`error: ${error}`);
        return { status: 'error', message: 'error saving patch' };
    }
}

export async function getAllPatches() {
    try {
        const patches = await Patch.find({}).select('patchPixelHexes -_id');
        return { status: 'success', message: 'success getting patches', data: patches };;
    } catch (error) {
        console.log(`error ${error}`)
        return { status: 'error', message: 'error getting patches', data: {} };;
    }
}

export async function getPatchesByRange(params) {
    const start_index = params.start_index;
    const end_index = params.end_index;
    try {
        if (start_index < 0 || end_index < 0 || end_index < start_index) {
            throw new Error('start index or end index is out of bounds');
        }
        const totalDocuments = await Patch.countDocuments({});
        if (end_index > totalDocuments || start_index > totalDocuments) {
            throw new Error('end index or start index is larger than the collection size');
        }
        const patches = await Patch.find({})
            .sort({ date: -1 })
            .skip(start_index)
            .limit(end_index - start_index)
            .select('patchPixelHexes -_id');
        return { status: 'success', message: 'success getting patches', data: patches };;
    } catch (error) {
        console.log(`error ${error}`);
        return { status: 'error', message: 'error getting patches', data: {} };;
    }
}

export async function getPatchCount() {
    try {
        const patchCount = await Patch.countDocuments({});
        return { status: 'success', message: 'success getting patch count', data: { patchCount } };
    } catch (error) {
        console.log(`error ${error}`)
        return { status: 'error', message: 'error getting patch count', data: {} };;
    }
}

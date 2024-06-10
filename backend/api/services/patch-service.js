import { Patch } from '../schemas/patch-schema.js';

export async function addPatch(params) {
    const patchPixelHexes = params.patchPixelHexes;
    try {
        const patch = new Patch({
            patchPixelHexes: patchPixelHexes
        });
        await patch.save();
        return { status: 'success', message: 'success saving patch', data: {} };
    } catch (error) {
        console.log(`error: ${error}`);
        return { status: 'error', message: 'error saving patch', data: {} };
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
    const start_index = parseInt(params.start_index, 10);
    const end_index = parseInt(params.end_index, 10);
    try {
        if (end_index < start_index) {
            throw new Error('start index is less than end index');
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

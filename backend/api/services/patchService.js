import { Patch } from '../schemas/patchSchema.js';

export async function addPatch(patchPixelHexes) {
    try {
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
        return { status: 'error', message:'error getting patches', data: {} };;
    }
}

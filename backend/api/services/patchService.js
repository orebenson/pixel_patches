import { Patch } from '../schemas/patchSchema.js';

export async function addPatch(pixelHexes) {
    try {
        const patch = new Patch({
            pixelHexes: pixelHexes
        });
        await patch.save();
        return 'added patch';
    } catch (error) {
        console.log(`error: ${error}`);
        return 'error';
    }
}

export async function getAllPatches() {
    try {
        const patches = await Patch.find({}).select('pixelHexes -_id');
        return patches;
    } catch (error) {
        console.log(`error ${error}`)
        return 'error';
    }
}

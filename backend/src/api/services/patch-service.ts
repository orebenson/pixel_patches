import { Patch } from '../schemas/patch-schema';
import { Logger } from "../utils/log-utils";

const log = Logger.getInstance();

export async function addPatch(params = { username: null, patchPixelHexes: [] }) {
    const username = params.username ? params.username : null;
    const patchPixelHexes = params.patchPixelHexes;
    try {
        const patch = new Patch({
            patchPixelHexes: patchPixelHexes,
            username: username
        });
        await patch.save();
        return { status: 200, message: 'success saving patch', data: {} };
    } catch (error) {
        log.logError("Patch error: ", error);
        return { status: 500, message: 'error saving patch', data: {} };
    }
}

export async function getAllPatches() {
    try {
        const patches = await Patch.find({}).select('patchPixelHexes username -_id');
        return { status: 200, message: 'success getting patches', data: patches };;
    } catch (error) {
        log.logError("Patch error: ", error)
        return { status: 500, message: 'error getting patches', data: {} };;
    }
}

export async function getPatchesByRange(params = { start_index: 0, end_index: 0 }) {
    const start_index = parseInt(String(params.start_index), 10);
    let end_index = parseInt(String(params.end_index), 10);
    if (start_index === end_index) return { status: 200, message: 'success getting patches', data: [] };
    try {
        if (end_index < start_index) {
            throw new Error('end index is less than start index');
        }
        const totalDocuments = await Patch.countDocuments({});
        if (start_index > totalDocuments) {
            throw new Error('start index is larger than the collection size');
        }
        if (end_index > totalDocuments) {
            end_index = totalDocuments;
        }
        const patches = await Patch.find({})
            .sort({ date: -1 })
            .skip(start_index)
            .limit(end_index - start_index)
            .select('patchPixelHexes username -_id');
        return { status: 200, message: 'success getting patches', data: patches };
    } catch (error) {
        log.logError("Patch error: ", error);
        return { status: 500, message: 'error getting patches', data: {} };
    }
}

export async function getPatchCount() {
    try {
        const patchCount = await Patch.countDocuments({});
        return { status: 200, message: 'success getting patch count', data: { patchCount } };
    } catch (error) {
        log.logError("Patch error: ", error)
        return { status: 500, message: 'error getting patch count', data: {} };;
    }
}

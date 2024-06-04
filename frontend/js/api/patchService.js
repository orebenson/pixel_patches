import * as Api from './api.js';

export async function submitPatch(patchPixelHexes) {
    if (patchPixelHexes.length !== 64) return;
    const result = await Api.POST('/patch/add', { patchPixelHexes });
    if (result === 'error') {
        alert('error uploading patch (it may already exist!)');
        return;
    };
    if (result === 'success') alert('success uploading patch!');
}

export async function getPatches(start_index, end_index) {
    if (start_index < 0) return;
    if (end_index < 0) return;
    const result = await Api.GET(`/patch/list/${start_index}/${end_index}`);
    if (result === 'error') {
        alert('error getting patches');
        return [];
    };
    return result;
}

export async function getTotalPatches() {
    const result = await Api.GET('/patch/list/count');
    if (result === 'error') {
        alert('error getting total patches');
        return null;
    };
    return result;
}

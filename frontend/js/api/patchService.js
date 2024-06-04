import * as Api from './api.js';

export async function submitPatch(patchPixelHexes) {
    if (patchPixelHexes.length !== 64) return;
    const result = await Api.POST('/patch/add', { patchPixelHexes });
    return result;
}

// function for get the next 50 patches (call ajax get to /patch/list/0/50 and return the array of values)
// export async function getPatches(start_index, end_index) {
//     const result = await Api.GET(`/patch/list/${start_index}/${end_index}`);
//     return result;
// }

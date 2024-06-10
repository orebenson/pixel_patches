import { Router } from 'express';
import * as PatchService from "../services/patch-service.js"
import { handleResponse } from "../utils/api-utils.js"

const router = Router();

router.get('/', (req, res) => {
    handleResponse(res, 200, 'success patch');
    return;
});

router.post('/add', async (req, res) => {
    const result = await PatchService.addPatch({
        patchPixelHexes: req.body.patchPixelHexes
    });
    handleResponse(res, result.status, result.message);
});

router.get('/list/:start_index/:end_index', async (req, res) => {
    const result = await PatchService.getPatchesByRange({
        start_index: parseInt(req.params.start_index, 10),
        end_index: parseInt(req.params.end_index, 10)
    });
    handleResponse(res, result.status, result.message, result.data);
    return;
});

router.get('/list/count', async (req, res) => {
    const result = await PatchService.getPatchCount();
    handleResponse(res, result.status, result.message, result.data);
    return;
});

router.get('/list', async (req, res) => {
    const result = await PatchService.getAllPatches();
    handleResponse(res, result.status, result.message, result.data);
    return;
});

export default router;

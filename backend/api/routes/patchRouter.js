import { Router } from 'express';
import * as PatchService from "../services/patchService.js"
import { sendRes } from "../utils/responseBuilder.js"

const router = Router();

router.get('/', (req, res) => {
    sendRes(res, 200, 'success patch');
    return;
});

router.post('/add', async (req, res) => {
    console.log(req.body);
    const { patchPixelHexes } = req.body;
    const result = await PatchService.addPatch(patchPixelHexes);
    let res_status = result.status === 'error' ? 500 : 200;
    sendRes(res, res_status, result.message);
});

router.get('/list', async (req, res) => {
    const result = await PatchService.getAllPatches();
    let res_status = result.status === 'error' ? 500 : 200;
    sendRes(res, res_status, result.message, result.data);
    return;
});

export default router;

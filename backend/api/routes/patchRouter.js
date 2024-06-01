import { Router } from 'express';
import * as PatchService from "../services/patchService.js"
import { sendRes } from "../utils/responseBuilder.js"

const router = Router();

router.get('/', (req, res) => {
    sendRes(res, 200, 'success patch');
    return;
});

// add a new patch (check that it doesnt already exist first)
router.post('/add', async (req, res) => {
    console.log(req.body);
    const { pixelHexes } = req.body;
    const result = await PatchService.addPatch(pixelHexes);
    sendRes(res, 200, result);
});

// get list of all patches (add cache here in future)
router.get('/list', async (req, res) => {
    const result = await PatchService.getAllPatches();
    sendRes(res, 200, result);
    return;
});

export default router;

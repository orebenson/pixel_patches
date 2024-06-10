import { Router } from 'express';
import * as PatchService from "../services/patch-service.js"
import { handleRequest, handleResponse } from "../utils/api-utils.js"
import * as Validator from "../middleware/validation.js"

const router = Router();

router.get('/', (req, res) => {
    handleResponse(res, 200, 'success patch');
    return;
});

router.post('/add',
    Validator.validate({
        patchPixelHexes: value => Array.isArray(value) && value.length === 64
    }),
    handleRequest(PatchService.addPatch)
);

router.get('/list/:start_index/:end_index',
    Validator.validate({
        start_index: value => Number.isInteger(parseInt(value, 10)) && value >= 0,
        end_index: value => Number.isInteger(parseInt(value, 10)) && value >= 0,
    }),
    handleRequest(PatchService.getPatchesByRange)
);

router.get('/list/count', handleRequest(PatchService.getPatchCount));

router.get('/list', handleRequest(PatchService.getAllPatches));

export default router;

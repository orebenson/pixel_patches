import { Router } from 'express';
import * as PatchService from "../services/patch-service"
import { handleRequest, handleResponse } from "../utils/api-utils"
import { validateFields } from "../middleware/validation"
import { handleAuth } from "../middleware/auth"

const router = Router();

router.get('/',
    handleAuth(),
    (req, res) => {
        handleResponse(res, 200, 'success patch', {}, { username: req.body.username });
        return;
    }
);

router.post('/add',
    handleAuth(),
    validateFields({
        patchPixelHexes: value => Array.isArray(value) && value.length === 64
    }),
    handleRequest(PatchService.addPatch)
);

router.get('/list/:start_index/:end_index',
    handleAuth(),
    validateFields({
        start_index: value => Number.isInteger(parseInt(value, 10)) && value >= 0,
        end_index: value => Number.isInteger(parseInt(value, 10)) && value >= 0,
    }),
    handleRequest(PatchService.getPatchesByRange)
);

router.get('/list/count',
    handleAuth(),
    handleRequest(PatchService.getPatchCount)
);

router.get('/list',
    handleAuth(),
    handleRequest(PatchService.getAllPatches)
);

export default router;

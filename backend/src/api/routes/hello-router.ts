import { Router } from 'express';
import { handleResponse } from "../utils/api-utils"

const router = Router();

router.get('/', (req, res) => {
    handleResponse(res, 200, 'hello world');
    return;
})

export default router;

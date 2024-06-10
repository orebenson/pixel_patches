import { Router } from 'express';
import { handleResponse } from "../utils/api-utils.js"

const router = Router();

router.get('/', (req, res) => {
    handleResponse(res, 200, 'hello world');
})

export default router;

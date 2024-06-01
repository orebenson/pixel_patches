import { Router } from 'express';
import { sendRes } from "../utils/responseBuilder.js"

const router = Router();

router.get('/', (req, res) => {
    sendRes(res, 200, 'hello world');
})

export default router;

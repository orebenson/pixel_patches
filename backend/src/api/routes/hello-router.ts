import { Router } from 'express';
import { handleResponse } from "../utils/api-utils"
import { handleAuth } from '../middleware/auth';

const router = Router();

router.get('/',
    handleAuth(),
    (req, res) => {
        handleResponse(res, 200, 'hello world', {}, { username: req.body.username });
        return;
    }
)

export default router;

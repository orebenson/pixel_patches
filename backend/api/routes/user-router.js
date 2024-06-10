import { Router } from 'express';
import * as UserService from "../services/user-service.js"
import { handleRequest, handleResponse } from "../utils/api-utils.js"
import * as Validator from "../middleware/validation.js"
import { hash } from "../middleware/auth.js"

const router = Router();

router.get('/', (req, res) => {
    handleResponse(res, 200, 'success user');
    return;
});

router.post('/add',
    hash(),
    Validator.validate({
        email: value => value.length < 64,
        username: value => value.length < 64
    }),
    handleRequest(UserService.addUser)
);

export default router;

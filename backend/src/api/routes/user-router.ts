import { Router } from 'express';
import * as UserService from "../services/user-service"
import { handleRequest, handleResponse } from "../utils/api-utils"
import { validateFields } from "../middleware/validation"
import * as Auth from "../middleware/auth"

const router = Router();

router.get('/', (req, res) => {
    handleResponse(res, 200, 'success user');
    return;
});

router.post('/add',
    Auth.hashPassword(),
    validateFields({
        email: value => value.length < 64 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        username: value => value.length < 64 && value.length > 2
    }),
    handleRequest(UserService.addUser)
);

export default router;

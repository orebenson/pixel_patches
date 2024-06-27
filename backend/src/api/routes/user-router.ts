import { Router } from 'express';
import * as UserService from "../services/user-service"
import { handleRequest, handleResponse } from "../utils/api-utils"
import { validateFields } from "../middleware/validation"
import { handleRegister, handleLogout, handleLogin, handleAuth, handleResetPassword, handleNewPassword } from "../middleware/auth"

const router = Router();

router.get('/',
    handleAuth(),
    (req, res) => {
        handleResponse(res, 200, 'success user', {}, { username: req.body.username });
        return;
    }
);

router.post('/',
    handleAuth(),
    (req, res) => {
        handleResponse(res, 200, 'success user', {}, { username: req.body.username });
        return;
    }
);

router.post('/register',
    handleRegister(),
    validateFields({
        email: value => value.length < 64 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        username: value => value.length < 64 && value.length > 2 && /^[a-zA-Z0-9_-]+$/.test(value)
    }),
    handleRequest(UserService.addUser)
);

router.post('/login',
    validateFields({
        email: value => value.length < 64 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }),
    handleLogin(),
    (req, res) => {
        handleResponse(res, 200, 'Login user success', {}, { username: req.body.username })
    }
);

router.post('/logout',
    handleLogout(),
    (req, res) => handleResponse(res, 200, 'Logout user success')
);

router.post('/resetpassword',
    validateFields({
        email: value => value.length > 0 && value.length < 64 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }),
    handleResetPassword(),
    (req, res) => handleResponse(res, 200, 'Reset password success')
);

router.post('/newpassword',
    validateFields({
        userid: value => value.length > 0,
        token: value => value.length > 0
    }),
    handleNewPassword(),
    (req, res) => handleResponse(res, 200, 'New password success')
);

export default router;

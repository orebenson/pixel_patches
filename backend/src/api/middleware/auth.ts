import bcrypt from 'bcrypt';
import { handleResponse } from "../utils/api-utils";
import { getUserByEmail, getUserById, updateUserPassword } from '../services/user-service';
import * as TokenService from "../services/token-service";
import { Logger } from "../utils/log-utils";
import crypto from "crypto";
import { sendPasswordResetRequestEmail } from '../utils/email-utils';
import { Token } from '../schemas/token-schema';

const FRONTEND_URL = process.env.FRONTEND_URL;
const log = Logger.getInstance();

export function handleRegister() {
    return async (req, res, next) => {
        try {
            if (req.session.username) throw new Error("User already logged in");

            const salt_rounds = 10;
            const salt = await bcrypt.genSalt(salt_rounds);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            req.params.username = req.body.username;
            req.body.username = '';
            next();
        } catch (error) {
            log.logError('Password errors: ', error);
            handleResponse(res, 400, 'Register user failed');
        }
    };
}

export function handleLogin() {
    return async (req, res, next) => {
        try {
            const user = await getUserByEmail({ email: req.body.email });
            if (!user) throw new Error("User does not exist");

            const result = await bcrypt.compare(req.body.password, user.password);
            if (!result) throw new Error("Password does not match");

            if (req.session.username) throw new Error("User already logged in");

            req.session.username = user.username;
            req.session.num_refresh = 0;
            req.session.creation_time = Date.now();

            await req.session.save();
            req.body.username = req.session.username;
            next();
        } catch (error) {
            log.logError('Login errors: ', error);
            handleResponse(res, 400, 'Login user failed');
        }
    };
}

export function handleLogout() {
    return async (req, res, next) => {
        try {
            if (req.session) {
                await req.session.destroy();
                req.body.username = null;
            }
            next();
        } catch (error) {
            log.logError('Logout errors: ', error);
            handleResponse(res, 400, 'Logout user failed');
        }
    };
}

export function handleAuth() {
    return async (req, res, next) => {
        try {

            if (!req.session) {
                req.body.username = null;
                return next();
            }

            if (req.session.num_refresh > 20) {
                await req.session.destroy();
                req.body.username = null;
                return next();
            }

            if (Date.now() > (Number(req.session.creation_time) + (1000 * 60 * 60 * 12))) {
                await req.session.destroy();
                req.body.username = null;
                return next();
            }

            // within 10 mins of expiry
            if (((Number(req.session.creation_time) + (1000 * 60 * 60 * 12)) - Date.now()) < (1000 * 60 * 10)) {
                const username = req.session.username;
                const num_refresh = req.session.num_refresh;
                await req.session.destroy();
                await req.session.regenerate();
                req.session.username = username;
                req.session.num_refresh = num_refresh + 1;
                req.session.creation_time = Date.now();
                await req.session.save();
            }

            req.body.username = req.session.username;
            next();
        } catch (error) {
            log.logError('Auth errors: ', error);
            handleResponse(res, 400, 'Auth failed');
        }
    };
}


export function handleResetPassword() {
    return async (req, res, next) => {
        try {
            const user = await getUserByEmail({ email: req.body.email });
            if (!user) throw new Error("User does not exist");

            await TokenService.deleteToken({ userid: user._id });

            let resetToken = crypto.randomBytes(32).toString("hex");
            const salt_rounds = 10;
            const salt = await bcrypt.genSalt(salt_rounds);
            const hash = await bcrypt.hash(resetToken, salt);

            await TokenService.addToken({ userid: user._id, token: hash })

            const link = `${FRONTEND_URL}/newpassword?tk=${resetToken}&id=${user._id}`;
            await sendPasswordResetRequestEmail(user.email, user.username, link);
            next();
        } catch (error) {
            log.logError('Reset password errors: ', error);
            handleResponse(res, 400, 'Reset password failed');
        }
    };
}

export function handleNewPassword() {
    return async (req, res, next) => {
        try {
            await TokenService.validateResetToken({ userid: req.body.userid, resetToken: req.body.token });

            const user = await getUserById({ userid: req.body.userid });
            if (!user) throw new Error("User does not exist");

            const salt_rounds = 10;
            const salt = await bcrypt.genSalt(salt_rounds);
            const hash = await bcrypt.hash(req.body.password, salt);

            await updateUserPassword({ userid: req.body.userid, password: hash });

            await TokenService.deleteToken({ userid: user._id })

            next();
        } catch (error) {
            log.logError('New password errors: ', error);
            handleResponse(res, 400, 'New password failed');
        }
    };
}

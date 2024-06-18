import bcrypt from 'bcrypt';
import { handleResponse } from "../utils/api-utils";
import { getUserByEmail } from '../services/user-service';

export function handleRegister() {
    return async (req, res, next) => {
        try {
            const salt_rounds = 10;
            const salt = await bcrypt.genSalt(salt_rounds);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            next();
        } catch (error) {
            console.error('Password errors: ', error);
            handleResponse(res, 400, 'Register user failed');
        }
    };
}

export function handleLogin() {
    return async (req, res, next) => {
        try {
            const user = await getUserByEmail({email: req.body.email});
            if(!user) throw new Error("User does not exist");

            const result = await bcrypt.compare(req.body.password, user.password);
            if(!result) throw new Error("Password does not match");

            req.session.username = user.username;
            req.session.num_refresh = 0;
            req.session.creation_time = Date.now();
            await req.session.save();

            next();
        } catch (error) {
            console.error('Login errors: ', error);
            handleResponse(res, 400, 'Login user failed');
        }
    };
}

export function handleAuth() {
    return async (req, res, next) => {
        try {
            if(req.session) {
                // if (req.session.num_refresh > 20) req.session.destroy();
                // check creation time on session
                    // if expired, revoke session
                    // if close to expiry, delete session and create new session, increasing number of refreshes by 1
                // if session valid: set req.body.username to req.session.username
            } else {
                req.body.username = null;
            }
            next();
        } catch (error) {
            console.error('Auth errors: ', error);
            handleResponse(res, 400, 'Auth user failed');
        }
    };
}

export function handleLogout() {
    return async (req, res, next) => {
        try {
            if(req.session) req.session.destroy();
            next();
        } catch (error) {
            console.error('Logout errors: ', error);
            handleResponse(res, 400, 'Logout user failed');
        }
    };
}


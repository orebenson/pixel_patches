import bcrypt from 'bcrypt';
import { handleResponse } from "../utils/api-utils";
import { getUserByEmail } from '../services/user-service';

export function handleRegister() {
    return async (req, res, next) => {
        try {
            const salt_rounds = 10;
            const salt = await bcrypt.genSalt(salt_rounds);
            req.body.password = await bcrypt.hash(req.body.password, salt);

            req.session.username = req.body.username;
            req.session.num_refresh = 0;
            req.session.creation_time = Date.now();

            await req.session.save();
            req.body.username = req.session.username;
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
            const user = await getUserByEmail({ email: req.body.email });
            if (!user) throw new Error("User does not exist");

            const result = await bcrypt.compare(req.body.password, user.password);
            if (!result) throw new Error("Password does not match");

            req.session.username = user.username;
            req.session.num_refresh = 0;
            req.session.creation_time = Date.now();
            
            await req.session.save();
            req.body.username = req.session.username;
            next();
        } catch (error) {
            console.error('Login errors: ', error);
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
            console.error('Logout errors: ', error);
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

            if (Date.now() > (req.session.creation_time + (1000 * 60 * 60 * 12))) {
                await req.session.destroy();
                req.body.username = null;
                return next();
            }

            // within 10 mins of expiry
            if (((req.session.creation_time + (1000 * 60 * 60 * 12)) - Date.now()) < (1000 * 60 * 10)) {
                const username = req.session.username;
                const num_refresh = req.session.num_refresh;
                await req.session.destroy();
                await req.session.regenerate();
                req.session.username = username;
                req.session.num_refresh = num_refresh + 1;
                req.session.creation_time = Date.now();
                await req.session.save();
            }
            // console.log("auth session: ", req.session)
            req.body.username = req.session.username;
            next();
        } catch (error) {
            console.error('Auth errors: ', error);
            handleResponse(res, 400, 'Auth failed');
        }
    };
}



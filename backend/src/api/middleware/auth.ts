import bcrypt from 'bcrypt';
import { handleResponse } from "../utils/api-utils";

export function hashPassword() {
    return async (req, res, next) => {
        try {
            const salt_rounds = 10;
            const salt = await bcrypt.genSalt(salt_rounds);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            next();
        } catch (error) {
            console.error('Password Errors: ', error);
            await handleResponse(res, 400, 'New user failed');
        }
    };
}



async function passwordMatch(hash, inputPassword) {
    try {
        const result = await bcrypt.compare(inputPassword, hash);
        return result;
    } catch (error) {
        console.error('Password Match Error: ', error);
        return false;
    }
}


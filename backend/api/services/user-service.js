import { User } from '../schemas/user-schema.js';

export async function addUser(params = { email: '', username: '', password: '' }) {
    const email = params.email;
    const username = params.username;
    const password = params.password;
    try {
        const user = new User({
            email: email,
            username: username,
            password: password,
        });
        await user.save();
        return { status: 200, message: 'success saving user', data: {} };
    } catch (error) {
        console.error(`User error: ${error}`);
        return { status: 500, message: 'error saving user', data: {} };
    }
}

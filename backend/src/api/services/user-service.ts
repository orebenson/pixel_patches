import { User } from '../schemas/user-schema';

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

export async function getUserByEmail(params: { email: string }) {
    const { email } = params;
    try {
        const user = await User.findOne({ email: email });
        if(!user) throw new Error('User does not exist');

        return user;
    } catch (error) {
        console.error(`User error: ${error}`);
        return null;
    }
}

export async function getUserById(params = { uid: '' }) {
    const { uid } = params;
    try {
        const user = await User.findOne({ _id: uid });
        if(!user) throw new Error('User does not exist');
        
        return user;
    } catch (error) {
        console.error(`User error: ${error}`);
        return null;
    }
}

export async function getUserByUsername(params = { username: '' }) {
    const { username } = params;
    try {
        const user = await User.findOne({ username: username });
        if(!user) throw new Error('User does not exist');
        
        return user;
    } catch (error) {
        console.error(`User error: ${error}`);
        return null;
    }
}

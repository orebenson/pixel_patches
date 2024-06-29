import { Types } from 'mongoose';
import { User } from '../schemas/user-schema';
import { Logger } from "../utils/log-utils";

const log = Logger.getInstance();

export async function addUser(params = { email: '', username: '', password: '' }) {
    try {
        const userExistsEmail = await User.findOne({ email: params.email });
        if (!!userExistsEmail) throw new Error('User already exists');

        const userExistsUsername = await User.findOne({ username: params.username });
        if (!!userExistsUsername) throw new Error('User already exists');

        const user = new User({
            email: params.email,
            username: params.username,
            password: params.password,
        });
        await user.save();
        return { status: 200, message: 'success saving user', data: {} };
    } catch (error) {
        log.logError("User error: ", error);
        return { status: 500, message: 'error saving user', data: {} };
    }
}

export async function getUserByEmail(params: { email: string }) {
    try {
        const user = await User.findOne({ email: params.email });
        if (!user) throw new Error('User does not exist');

        return user;
    } catch (error) {
        log.logError("User error: ", error);
        return null;
    }
}

export async function getUserById(params: { userid: Types.ObjectId }) {
    try {
        const user = await User.findOne({ _id: params.userid });
        if (!user) throw new Error('User does not exist');

        return user;
    } catch (error) {
        log.logError("User error: ", error);
        return null;
    }
}

export async function getUserByUsername(params = { username: '' }) {
    try {
        const user = await User.findOne({ username: params.username });
        if (!user) throw new Error('User does not exist');

        return user;
    } catch (error) {
        log.logError("User error: ", error);
        return null;
    }
}

export async function updateUserPassword(params: { userid: Types.ObjectId, password: string }) {
    try {
        await User.updateOne(
            { _id: params.userid },
            { $set: { password: params.password } },
            { new: true }
        );
        return;
    } catch (error) {
        throw error;
    }
}

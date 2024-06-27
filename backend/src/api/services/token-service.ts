import { Types } from "mongoose";
import { Token } from "../schemas/token-schema";

export async function addToken(params: { userid: Types.ObjectId, token: String }) {
    try {
        const token = new Token({
            userid: params.userid,
            token: params.token
        });
        await token.save();
        return { status: 200, message: 'success saving token', data: {} };
    } catch (error) {
        console.error(`Token error: ${error}`);
        return { status: 500, message: 'error saving token', data: {} };
    }
}

export async function deleteToken(params: { userid: Types.ObjectId }) {
    try {
        let token = await Token.findOne({ userid: params.userid });
        if (token) await token.deleteOne();
        return { status: 200, message: 'success deleting token', data: {} };
    } catch (error) {
        console.error(`Token error: ${error}`);
        return { status: 500, message: 'error deleting token', data: {} };
    }
}

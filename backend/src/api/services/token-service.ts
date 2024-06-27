import { Types } from "mongoose";
import { Token } from "../schemas/token-schema";
import bcrypt from 'bcrypt';

export async function addToken(params: { userid: Types.ObjectId, token: String }) {
    try {
        const token = new Token({
            userid: params.userid,
            token: params.token
        });
        await token.save();
        return;
    } catch (error) {
        return error;
    }
}

export async function deleteToken(params: { userid: Types.ObjectId }) {
    try {
        let token = await Token.findOne({ userid: params.userid });
        if (token) await token.deleteOne();
        return;
    } catch (error) {
        return error;
    }
}

export async function validateResetToken(params: { userid: Types.ObjectId, resetToken: string }) {
    try {
        let token = await Token.findOne({ userid: params.userid });
        if (!token) throw new Error("Invalid reset token");

        if (Date.now() > (Number(token.date) + (1000 * 60 * 15))) throw new Error("Expired reset token");

        const valid = await bcrypt.compare(params.resetToken, token.token);
        if (!valid) throw new Error("Invalid reset token");

        return;
    } catch (error) {
        throw error;
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResetToken = exports.deleteToken = exports.addToken = void 0;
const token_schema_1 = require("../schemas/token-schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
function addToken(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = new token_schema_1.Token({
                userid: params.userid,
                token: params.token
            });
            yield token.save();
            return;
        }
        catch (error) {
            return error;
        }
    });
}
exports.addToken = addToken;
function deleteToken(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = yield token_schema_1.Token.findOne({ userid: params.userid });
            if (token)
                yield token.deleteOne();
            return;
        }
        catch (error) {
            return error;
        }
    });
}
exports.deleteToken = deleteToken;
function validateResetToken(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = yield token_schema_1.Token.findOne({ userid: params.userid });
            if (!token)
                throw new Error("Invalid reset token");
            if (Date.now() > (Number(token.date) + (1000 * 60 * 15)))
                throw new Error("Expired reset token");
            const valid = yield bcrypt_1.default.compare(params.resetToken, token.token);
            if (!valid)
                throw new Error("Invalid reset token");
            return;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.validateResetToken = validateResetToken;

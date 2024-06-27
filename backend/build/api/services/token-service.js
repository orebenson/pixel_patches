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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteToken = exports.addToken = void 0;
const token_schema_1 = require("../schemas/token-schema");
function addToken(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = new token_schema_1.Token({
                userid: params.userid,
                token: params.token
            });
            yield token.save();
            return { status: 200, message: 'success saving token', data: {} };
        }
        catch (error) {
            console.error(`Token error: ${error}`);
            return { status: 500, message: 'error saving token', data: {} };
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
            return { status: 200, message: 'success deleting token', data: {} };
        }
        catch (error) {
            console.error(`Token error: ${error}`);
            return { status: 500, message: 'error deleting token', data: {} };
        }
    });
}
exports.deleteToken = deleteToken;

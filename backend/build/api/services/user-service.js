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
exports.addUser = void 0;
const user_schema_1 = require("../schemas/user-schema");
function addUser() {
    return __awaiter(this, arguments, void 0, function* (params = { email: '', username: '', password: '' }) {
        const email = params.email;
        const username = params.username;
        const password = params.password;
        try {
            const user = new user_schema_1.User({
                email: email,
                username: username,
                password: password,
            });
            yield user.save();
            return { status: 200, message: 'success saving user', data: {} };
        }
        catch (error) {
            console.error(`User error: ${error}`);
            return { status: 500, message: 'error saving user', data: {} };
        }
    });
}
exports.addUser = addUser;

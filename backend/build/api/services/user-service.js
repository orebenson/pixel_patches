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
exports.getUserByUsername = exports.getUserById = exports.getUserByEmail = exports.addUser = void 0;
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
function getUserByEmail(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = params.email;
        try {
            const user = yield user_schema_1.User.findOne({ email: email });
            if (!user)
                throw new Error('User does not exist');
            return user;
        }
        catch (error) {
            console.error(`User error: ${error}`);
            return null;
        }
    });
}
exports.getUserByEmail = getUserByEmail;
function getUserById() {
    return __awaiter(this, arguments, void 0, function* (params = { uid: '' }) {
        const uid = params.uid;
        try {
            const user = yield user_schema_1.User.findOne({ _id: uid });
            if (!user)
                throw new Error('User does not exist');
            return user;
        }
        catch (error) {
            console.error(`User error: ${error}`);
            return null;
        }
    });
}
exports.getUserById = getUserById;
function getUserByUsername() {
    return __awaiter(this, arguments, void 0, function* (params = { username: '' }) {
        const username = params.username;
        try {
            const user = yield user_schema_1.User.findOne({ username: username });
            if (!user)
                throw new Error('User does not exist');
            return user;
        }
        catch (error) {
            console.error(`User error: ${error}`);
            return null;
        }
    });
}
exports.getUserByUsername = getUserByUsername;

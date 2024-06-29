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
exports.updateUserPassword = exports.getUserByUsername = exports.getUserById = exports.getUserByEmail = exports.addUser = void 0;
const user_schema_1 = require("../schemas/user-schema");
const log_utils_1 = require("../utils/log-utils");
const log = log_utils_1.Logger.getInstance();
function addUser() {
    return __awaiter(this, arguments, void 0, function* (params = { email: '', username: '', password: '' }) {
        try {
            const userExistsEmail = yield user_schema_1.User.findOne({ email: params.email });
            if (!!userExistsEmail)
                throw new Error('User already exists');
            const userExistsUsername = yield user_schema_1.User.findOne({ username: params.username });
            if (!!userExistsUsername)
                throw new Error('User already exists');
            const user = new user_schema_1.User({
                email: params.email,
                username: params.username,
                password: params.password,
            });
            yield user.save();
            return { status: 200, message: 'success saving user', data: {} };
        }
        catch (error) {
            log.logError("User error: ", error);
            return { status: 500, message: 'error saving user', data: {} };
        }
    });
}
exports.addUser = addUser;
function getUserByEmail(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_schema_1.User.findOne({ email: params.email });
            if (!user)
                throw new Error('User does not exist');
            return user;
        }
        catch (error) {
            log.logError("User error: ", error);
            return null;
        }
    });
}
exports.getUserByEmail = getUserByEmail;
function getUserById(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_schema_1.User.findOne({ _id: params.userid });
            if (!user)
                throw new Error('User does not exist');
            return user;
        }
        catch (error) {
            log.logError("User error: ", error);
            return null;
        }
    });
}
exports.getUserById = getUserById;
function getUserByUsername() {
    return __awaiter(this, arguments, void 0, function* (params = { username: '' }) {
        try {
            const user = yield user_schema_1.User.findOne({ username: params.username });
            if (!user)
                throw new Error('User does not exist');
            return user;
        }
        catch (error) {
            log.logError("User error: ", error);
            return null;
        }
    });
}
exports.getUserByUsername = getUserByUsername;
function updateUserPassword(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield user_schema_1.User.updateOne({ _id: params.userid }, { $set: { password: params.password } }, { new: true });
            return;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.updateUserPassword = updateUserPassword;

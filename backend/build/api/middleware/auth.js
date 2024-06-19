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
exports.handleLogout = exports.handleAuth = exports.handleLogin = exports.handleRegister = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const api_utils_1 = require("../utils/api-utils");
const user_service_1 = require("../services/user-service");
function handleRegister() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const salt_rounds = 10;
            const salt = yield bcrypt_1.default.genSalt(salt_rounds);
            req.body.password = yield bcrypt_1.default.hash(req.body.password, salt);
            next();
        }
        catch (error) {
            console.error('Password errors: ', error);
            (0, api_utils_1.handleResponse)(res, 400, 'Register user failed');
        }
    });
}
exports.handleRegister = handleRegister;
function handleLogin() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.getUserByEmail)({ email: req.body.email });
            if (!user)
                throw new Error("User does not exist");
            const result = yield bcrypt_1.default.compare(req.body.password, user.password);
            if (!result)
                throw new Error("Password does not match");
            req.session.username = user.username;
            req.session.num_refresh = 0;
            req.session.creation_time = Date.now();
            yield req.session.save();
            next();
        }
        catch (error) {
            console.error('Login errors: ', error);
            (0, api_utils_1.handleResponse)(res, 400, 'Login user failed');
        }
    });
}
exports.handleLogin = handleLogin;
function handleAuth() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.session) {
                // if (req.session.num_refresh > 20) req.session.destroy();
                // check creation time on session
                // if expired, revoke session
                // if close to expiry, delete session and create new session, increasing number of refreshes by 1
                // if session valid: set req.body.username to req.session.username
            }
            else {
                req.body.username = null;
            }
            next();
        }
        catch (error) {
            console.error('Auth errors: ', error);
            (0, api_utils_1.handleResponse)(res, 400, 'Auth user failed');
        }
    });
}
exports.handleAuth = handleAuth;
function handleLogout() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.session) {
                console.log("SESSIONSSSS");
                yield req.session.destroy();
            }
            next();
        }
        catch (error) {
            console.error('Logout errors: ', error);
            (0, api_utils_1.handleResponse)(res, 400, 'Logout user failed');
        }
    });
}
exports.handleLogout = handleLogout;

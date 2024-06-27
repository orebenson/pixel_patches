"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.handleNewPassword = exports.handleResetPassword = exports.handleAuth = exports.handleLogout = exports.handleLogin = exports.handleRegister = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const api_utils_1 = require("../utils/api-utils");
const user_service_1 = require("../services/user-service");
const TokenService = __importStar(require("../services/token-service"));
const log_utils_1 = require("../utils/log-utils");
const crypto_1 = __importDefault(require("crypto"));
const email_utils_1 = require("../utils/email-utils");
const FRONTEND_URL = process.env.FRONTEND_URL;
const log = log_utils_1.Logger.getInstance();
function handleRegister() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.session.username)
                throw new Error("User already logged in");
            const salt_rounds = 10;
            const salt = yield bcrypt_1.default.genSalt(salt_rounds);
            req.body.password = yield bcrypt_1.default.hash(req.body.password, salt);
            req.params.username = req.body.username;
            req.body.username = '';
            next();
        }
        catch (error) {
            log.logError('Password errors: ', error);
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
            if (req.session.username)
                throw new Error("User already logged in");
            req.session.username = user.username;
            req.session.num_refresh = 0;
            req.session.creation_time = Date.now();
            yield req.session.save();
            req.body.username = req.session.username;
            next();
        }
        catch (error) {
            log.logError('Login errors: ', error);
            (0, api_utils_1.handleResponse)(res, 400, 'Login user failed');
        }
    });
}
exports.handleLogin = handleLogin;
function handleLogout() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.session) {
                yield req.session.destroy();
                req.body.username = null;
            }
            next();
        }
        catch (error) {
            log.logError('Logout errors: ', error);
            (0, api_utils_1.handleResponse)(res, 400, 'Logout user failed');
        }
    });
}
exports.handleLogout = handleLogout;
function handleAuth() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.session) {
                req.body.username = null;
                return next();
            }
            if (req.session.num_refresh > 20) {
                yield req.session.destroy();
                req.body.username = null;
                return next();
            }
            if (Date.now() > (Number(req.session.creation_time) + (1000 * 60 * 60 * 12))) {
                yield req.session.destroy();
                req.body.username = null;
                return next();
            }
            // within 10 mins of expiry
            if (((Number(req.session.creation_time) + (1000 * 60 * 60 * 12)) - Date.now()) < (1000 * 60 * 10)) {
                const username = req.session.username;
                const num_refresh = req.session.num_refresh;
                yield req.session.destroy();
                yield req.session.regenerate();
                req.session.username = username;
                req.session.num_refresh = num_refresh + 1;
                req.session.creation_time = Date.now();
                yield req.session.save();
            }
            req.body.username = req.session.username;
            next();
        }
        catch (error) {
            log.logError('Auth errors: ', error);
            (0, api_utils_1.handleResponse)(res, 400, 'Auth failed');
        }
    });
}
exports.handleAuth = handleAuth;
function handleResetPassword() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.getUserByEmail)({ email: req.body.email });
            if (!user)
                throw new Error("User does not exist");
            yield TokenService.deleteToken({ userid: user._id });
            let resetToken = crypto_1.default.randomBytes(32).toString("hex");
            const salt_rounds = 10;
            const salt = yield bcrypt_1.default.genSalt(salt_rounds);
            const hash = yield bcrypt_1.default.hash(resetToken, salt);
            yield TokenService.addToken({ userid: user._id, token: hash });
            const link = `${FRONTEND_URL}/newpassword?tk=${resetToken}&id=${user._id}`;
            yield (0, email_utils_1.sendPasswordResetRequestEmail)(user.email, user.username, link);
            next();
        }
        catch (error) {
            log.logError('Reset password errors: ', error);
            (0, api_utils_1.handleResponse)(res, 400, 'Reset password failed');
        }
    });
}
exports.handleResetPassword = handleResetPassword;
function handleNewPassword() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield TokenService.validateResetToken({ userid: req.body.userid, resetToken: req.body.token });
            const user = yield (0, user_service_1.getUserById)({ userid: req.body.userid });
            if (!user)
                throw new Error("User does not exist");
            const salt_rounds = 10;
            const salt = yield bcrypt_1.default.genSalt(salt_rounds);
            const hash = yield bcrypt_1.default.hash(req.body.password, salt);
            yield (0, user_service_1.updateUserPassword)({ userid: req.body.userid, password: hash });
            yield TokenService.deleteToken({ userid: user._id });
            next();
        }
        catch (error) {
            log.logError('New password errors: ', error);
            (0, api_utils_1.handleResponse)(res, 400, 'New password failed');
        }
    });
}
exports.handleNewPassword = handleNewPassword;

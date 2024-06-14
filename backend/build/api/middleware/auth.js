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
exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const api_utils_1 = require("../utils/api-utils");
function hashPassword() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const salt_rounds = 10;
            const salt = yield bcrypt_1.default.genSalt(salt_rounds);
            req.body.password = yield bcrypt_1.default.hash(req.body.password, salt);
            next();
        }
        catch (error) {
            console.error('Password Errors: ', error);
            yield (0, api_utils_1.handleResponse)(res, 400, 'New user failed');
        }
    });
}
exports.hashPassword = hashPassword;
function passwordMatch(hash, inputPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield bcrypt_1.default.compare(inputPassword, hash);
            return result;
        }
        catch (error) {
            console.error('Password Match Error: ', error);
            return false;
        }
    });
}

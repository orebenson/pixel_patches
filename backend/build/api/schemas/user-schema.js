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
exports.userSchema = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return __awaiter(this, void 0, void 0, function* () {
                    const existingUserEmail = yield this.constructor.findOne({ email: value });
                    return !existingUserEmail;
                });
            },
            message: 'User email must be unique'
        }
    },
    username: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return __awaiter(this, void 0, void 0, function* () {
                    const existingUser = yield this.constructor.findOne({ username: value });
                    return !existingUser;
                });
            },
            message: 'Username must be unique'
        }
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { collection: 'users' });
exports.userSchema = userSchema;
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;

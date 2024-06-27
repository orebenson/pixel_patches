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
exports.patchSchema = exports.Patch = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_schema_1 = require("./user-schema");
const patchSchema = new mongoose_1.default.Schema({
    patchPixelHexes: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return __awaiter(this, void 0, void 0, function* () {
                    const existingPatch = yield this.constructor.findOne({ patchPixelHexes: value });
                    return !existingPatch;
                });
            },
            message: 'Pixel Patches must be unique'
        }
    },
    username: {
        type: String,
        default: '',
        validate: {
            validator: function (value) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!value)
                        return true;
                    const existingUser = yield user_schema_1.User.findOne({ username: value });
                    return !!existingUser;
                });
            },
            message: 'Username must exist in user schema'
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, { collection: 'patches' });
exports.patchSchema = patchSchema;
const Patch = mongoose_1.default.model('Patch', patchSchema);
exports.Patch = Patch;

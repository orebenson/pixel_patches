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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserService = __importStar(require("../services/user-service"));
const api_utils_1 = require("../utils/api-utils");
const validation_1 = require("../middleware/validation");
const Auth = __importStar(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    (0, api_utils_1.handleResponse)(res, 200, 'success user');
    return;
});
router.post('/add', Auth.hashPassword(), (0, validation_1.validateFields)({
    email: value => value.length < 64 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    username: value => value.length < 64 && value.length > 2
}), (0, api_utils_1.handleRequest)(UserService.addUser));
exports.default = router;

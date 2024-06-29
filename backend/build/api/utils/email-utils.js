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
exports.sendPasswordResetRequestEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const log_utils_1 = require("../utils/log-utils");
const log = log_utils_1.Logger.getInstance();
function sendPasswordResetRequestEmail(email, username, resetlink) {
    return __awaiter(this, void 0, void 0, function* () {
        let transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        let mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Password Reset Request',
            html: `
                <p>Hi ${username},</p>
                <p>We received a request to reset your password. Please click the link below to reset your password:</p>
                <a href="${resetlink}">Reset Password</a>
                <p>If you did not request a password reset, please ignore this email.</p>
                <p>Thank you!</p>
            `
        };
        try {
            const info = yield transporter.sendMail(mailOptions);
            log.logMessage(`Email sent: ${info.response}`);
        }
        catch (error) {
            throw error;
        }
    });
}
exports.sendPasswordResetRequestEmail = sendPasswordResetRequestEmail;

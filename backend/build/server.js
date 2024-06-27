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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const fs = __importStar(require("fs"));
const log_utils_1 = require("./api/utils/log-utils");
const PORT = process.env.PORT;
const LOGFOLDER = process.env.PATH_TO_LOG_FOLDER;
const log = log_utils_1.Logger.getInstance();
const server = app_1.default.listen(PORT, () => {
    log.logMessage(`App listening on port ${PORT}`);
});
if (!fs.existsSync(LOGFOLDER)) {
    fs.mkdirSync(LOGFOLDER);
}
const handleShutdown = () => {
    log.logMessage('Server is shutting down...');
    server.close(() => {
        log.serializeLogsToFile(`${LOGFOLDER}logs_${Date.now()}.json`);
        log.logMessage('Server shutdown complete.');
        process.exit(0);
    });
};
process.on('SIGINT', () => {
    log.logMessage('Received SIGINT signal. Closing server gracefully.');
    handleShutdown();
});
process.on('SIGTERM', () => {
    log.logMessage('Received SIGTERM signal. Closing server gracefully.');
    handleShutdown();
});
process.on('uncaughtException', (err) => {
    log.logError('Uncaught Exception occurred. Server will terminate.', err);
    log.serializeLogsToFile(`${LOGFOLDER}logs_${Date.now()}_error.json`);
    process.exit(1);
});
process.on('exit', (code) => {
    log.logMessage(`Server process exited with code ${code}`);
});

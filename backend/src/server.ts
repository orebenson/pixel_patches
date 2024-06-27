import app from './app';
import * as fs from 'fs';
import { Logger } from "./api/utils/log-utils";

const PORT = process.env.PORT;
const LOGFOLDER = process.env.PATH_TO_LOG_FOLDER;
const log = Logger.getInstance();

const server = app.listen(PORT, () => {
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

import * as fs from 'fs';

interface LogEntry {
    timestamp: Date;
    message: string;
    error?: string;
}

export class Logger {
    private static instance: Logger;
    private logs: LogEntry[];

    private constructor() {
        this.logs = [];
    }

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    logError(message: string, error: Error) {
        console.error(message, error);
        this.logs.push({
            timestamp: new Date(),
            message: message,
            error: error.stack
        });
    }

    logMessage(message: string) {
        console.log(message);
        this.logs.push({
            timestamp: new Date(),
            message: message
        });
    }

    serializeLogsToFile(filePath: string) {
        const serializedLogs = JSON.stringify(this.logs, null, 2);
        fs.writeFileSync(filePath, serializedLogs);
    }
}

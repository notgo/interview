import * as winston from 'winston'

interface ILogger {
    trackException(exception: Error): void;

    trackNodeHttpRequest(message: string): void;

    trackTrace(message: string): void;
}

export class MyLogger implements ILogger {
    private static instance: MyLogger
    errorLog: winston.Logger
    requestLog: winston.Logger
    infoLog: winston.Logger

    static getInstance() {
        return this.instance || (this.instance = new MyLogger())
    }
    async trackException(exception: Error) {
        this.errorLog.error({ message: exception.stack });
    }

    async trackNodeHttpRequest(message: string) {
        this.requestLog.http(message)
    }

    async trackTrace(message: string) {
        this.infoLog.info(message);
    }
}

const logger = MyLogger.getInstance();
const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf, json, prettyPrint } = format;
logger.errorLog = createLogger({
    level: 'error',
    // exceptionHandlers: [
    //     new winston.transports.File({ filename: 'logs/exceptions.log' })
    // ],
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    defaultMeta: { service: 'service' },
    transports: [
        new transports.File({
            // name: 'error-file',
            level: 'error',
            filename: 'logs/error.log',
            // json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            // colorize: false
        })
    ],
    exitOnError: false
});

logger.requestLog = createLogger({
    level: 'http',
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    defaultMeta: { service: 'service' },
    transports: [
        new transports.File({
            // name: 'request-file',
            level: 'http',
            filename: 'logs/request.log',
            // json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            // colorize: false
        })],
    exitOnError: false
});

logger.infoLog = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    defaultMeta: { service: 'coupon-service' },
    transports: [
        new transports.File({
            // name: 'info-file',
            level: 'info',
            filename: 'logs/info.log',
            // json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            // colorize: false
        })],
    exitOnError: false
});

export { logger };



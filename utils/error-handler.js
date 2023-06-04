
require('dotenv').config();
const winston = require('winston');
require('winston-daily-rotate-file');
require('winston-papertrail').Papertrail;
const url = require('url');
const PapertrailTransport = require('winston-papertrail-transport');

// Extract the Papertrail host and port from the PAPERTRAIL_URL
const papertrailUrl = url.parse(process.env.PAPERTRAIL_URL);
const papertrailHost = papertrailUrl.hostname;
const papertrailPort = papertrailUrl.port;
const papertrailTransport = new PapertrailTransport({
    host: papertrailHost,
    port: papertrailPort,
    colorize: true, // Set to true if you want to add color to the logs
    logFormat: function (level, message) {
        return '[' + level + '] ' + message;
    },
    auth: {
        authToken: process.env.PAPERTRAIL_API_TOKEN,
    },
});
const logger = winston.createLogger({
    //we can log error, and message if level is ifno
    level: process.env.NODE_ENV === 'local' ? 'debug' : 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        // new winston.transports.Console(),
        // new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
    exceptionHandlers: [
        // new winston.transports.File({ filename: 'logs/exceptions.log' })
        // new winston.transports.Console(),
    ]
});
if(process.env.NODE_ENV === 'local'){
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}else{
    // logger.add(
    //     new winston.transports.DailyRotateFile(
    //         { 
    //             filename: 'logs/combined-%DATE%.log' ,
    //             datePattern: 'YYYY-MM-DD-HH',
    //             maxSize: '20m',
    //             maxFiles: '14d',
    //         }
    //         )
    // );

    logger.add(papertrailTransport);
}

module.exports = logger;

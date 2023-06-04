
require('dotenv').config();
const winston = require('winston');

require('winston-daily-rotate-file');


// Retrieve Papertrail credentials from Heroku environment variables
const papertrailHost = process.env.PAPERTRAIL_HOST;
const papertrailPort = process.env.PAPERTRAIL_PORT;
const papertrailApiKey = process.env.PAPERTRAIL_API_TOKEN;
// const url = require('url');
// const PapertrailTransport = require('winston-papertrail-transport');

// // Extract the Papertrail host and port from the PAPERTRAIL_URL


// let papertrailUrl = "";
// if (process.env.PAPERTRAIL_URL) {
//     papertrailUrl = url.parse(process.env?.PAPERTRAIL_URL | "")
// };
// const papertrailHost = papertrailUrl?.hostname;
// const papertrailPort = papertrailUrl?.port;
// const papertrailTransport = new PapertrailTransport({
//     host: papertrailHost,
//     port: papertrailPort,
//     colorize: true, // Set to true if you want to add color to the logs
//     logFormat: function (level, message) {
//         return '[' + level + '] ' + message;
//     },
//     auth: {
//         authToken: process.env.PAPERTRAIL_API_TOKEN,
//     },
// });
const winstonPaperTrail = new winston.transports.Papertrail({
    host: papertrailHost,
    port: papertrailPort,
    apiKey: papertrailApiKey,
    logFormat: function (level, message) {
        return `[${level}] ${message}`;
    },
})
winstonPaperTrail.on('error', function (err) {
    // Handle, report, or silently ignore connection errors and failures
});
const logger = winston.createLogger({
    //we can log error, and message if level is ifno
    // level: process.env.NODE_ENV === 'local' ? 'debug' : 'info',
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        // new winston.transports.Console(),
        // new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
    exceptionHandlers: [
       
    ]
});
if(process.env.NODE_ENV === 'local'){
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
    
}else{
    logger.add(winstonPaperTrail);
  
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

    
}

module.exports = logger;

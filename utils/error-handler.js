
require('dotenv').config();
const winston = require('winston');



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
        handleExceptions: true
    }));
    
}else{
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
        handleExceptions: true
    }));
}
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
module.exports = logger;


require('dotenv').config();
const winston = require('winston');
const logger = winston.createLogger({
    level: process.env.NODE_ENV !== 'local' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        // new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'logs/combined.log' })
    ],
    exceptionHandlers: [
        // new winston.transports.File({ filename: 'logs/exceptions.log' })
        new winston.transports.Console(),
    ]
});

module.exports = logger;

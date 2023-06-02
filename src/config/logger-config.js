const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, errors } = format;

const customFormat = printf((info) => {
  const { timestamp, level, message } = info;
  const stack = info.stack || '';
  return `${timestamp} : ${level} : ${message} ${stack}`;
});

const combinedLogger = createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), customFormat),
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
      )
    }),
    new transports.File({ filename: 'combined.log' })
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'uncaughtExceptions.log' })
  ]
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
      )
    }),
    new transports.File({ filename: 'errors.log' })
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'uncaughtExceptions.log' })
  ]
});

module.exports = {
  combinedLogger,
  errorLogger
};

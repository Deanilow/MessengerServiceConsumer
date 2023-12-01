const winston = require('winston');
const path = require('path');
const expressWinston = require('express-winston');
const {
  PRODUCTION_ENV,
  VERBOSE_LOGGING_LVL,
  INFO_LOGGING_LVL,
} = require('../constants');

const logFilePath = path.join(__dirname, './../../storage/logs/status.log');

const getTransports = () => {
  const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: logFilePath,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json(),
      ),
    }),
  ];
  return transports;
};

const getFormat = () => winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.json(),
);

const requestLogger = expressWinston.logger({
  transports: getTransports(),
  format: getFormat(),
  // colorize: true,
  // expressFormat: true,
  // meta: true,
});

const errorLogger = expressWinston.errorLogger({
  transports: getTransports(),
  format: getFormat(),
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV !== PRODUCTION_ENV ? VERBOSE_LOGGING_LVL : INFO_LOGGING_LVL,
  format: getFormat(),
  transports: getTransports(),
});

module.exports = {
  requestLogger,
  errorLogger,
  raw: logger,
  error: logger.error.bind(logger),
  warn: logger.warn.bind(logger),
  info: logger.info.bind(logger),
  log: logger.log.bind(logger),
  verbose: logger.verbose.bind(logger),
  debug: logger.debug.bind(logger),
  silly: logger.silly.bind(logger),
};

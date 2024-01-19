const winston = require('winston');
const path = require('path');
const {
  PRODUCTION_ENV,
  VERBOSE_LOGGING_LVL,
  INFO_LOGGING_LVL,
} = require('../constants');

const  config  = require('../../configuration');

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};

const logFileName = `${config.nameService}_${getCurrentDate()}.txt`;
// const logFilePath = path.join(__dirname, `./../../storage/logs/${logFileName}`);
// const path = config.pathFileLogs || path.join(__dirname, `./../../storage/logs`)
const logFilePath = path.join(`${config.pathFileLogs}/${logFileName}`);
// const logFilePath = path.join(`${path}/${logFileName}`);

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

const logger = winston.createLogger({
  level: process.env.NODE_ENV !== PRODUCTION_ENV ? VERBOSE_LOGGING_LVL : INFO_LOGGING_LVL,
  format: getFormat(),
  transports: getTransports(),
});

module.exports = {
  raw: logger,
  error: logger.error.bind(logger),
  warn: logger.warn.bind(logger),
  info: logger.info.bind(logger),
  log: logger.log.bind(logger),
  verbose: logger.verbose.bind(logger),
  debug: logger.debug.bind(logger),
  silly: logger.silly.bind(logger),
};

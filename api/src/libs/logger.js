import { createLogger, transports, format } from 'winston';

/**
 * Simple logger with limit size of 5MB, starts creating
 * copies of 'errors.log' when the limit is reached.
 *
 * To use, simply:
 * - Import this module.
 * - Add it in the exception or whenever you need to log an error like:
 * logger.error(<message>);
 *
 * <message> can be an object.
 *
 * It will store the current time, the message and a label 'error' in JSON.
 */
const logger = new createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.prettyPrint(),
  ),
  transports: [
    new transports.File({
      level: 'error',
      filename: './logs/errors.log',
      maxsize: 5242880,
      maxFiles: 3,
      handleExceptions: true,
      json: true,
    }),
  ],
  exitOnError: false,
});

const customMorganFormat = '\
 Requested ":url" using :method method with HTTP :http-version.\
  \nIt took :total-time[2] milliseconds to be completed and returned a :status status code.\
  \n:date[web]\n:user-agent \n';

export {
  logger,
  customMorganFormat,
};
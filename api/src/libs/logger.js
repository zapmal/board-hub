import { createLogger, transports, format } from 'winston';

/**
 * Logger with limit size of 5MB, starts creating
 * copies of 'errors.log' when the limit is reached.
 *
 * Catches logs automatically unhandled rejections and
 * exceptions in their respective log files.
 *
 * To use the error logger, simply:
 * - Import this module.
 * - Add it like:
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
      json: true,
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: './logs/exceptions.log',
      maxsize: 5242880,
      maxFiles: 2,
      json: true,
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: './logs/rejections.log',
      maxsize: 5242880,
      maxFiles: 1,
      json: true,
    }),
  ],
  exitOnError: false,
});

export const customMorganFormat = '\
Requested ":url" using :method method with HTTP :http-version.\
  \nIt took :total-time[2] milliseconds to be completed and returned a :status status code.\
  \n:date[web]\n:user-agent \n';

export default logger;
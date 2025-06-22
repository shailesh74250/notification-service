import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { ILoggerTransport } from '../logger.interface';
import { LOGGER_CONFIG, LOGGER_LEVELS } from '../constants/logger.constants';

/**
 * File Transport
 *
 * This transport outputs logs to a file with rotation.
 * @class FileTransport
 * @implements {ILoggerTransport}
 */
export class FileTransport implements ILoggerTransport {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: LOGGER_LEVELS.DEBUG, // Log all levels (debug, info, warn, error)
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.DailyRotateFile({
          filename: LOGGER_CONFIG.FILE_ROTATION_CONFIG.FILENAME,
          datePattern: LOGGER_CONFIG.FILE_ROTATION_CONFIG.DATE_PATTERN,
          zippedArchive: true,
          maxSize: LOGGER_CONFIG.FILE_ROTATION_CONFIG.MAX_SIZE,
          maxFiles: LOGGER_CONFIG.FILE_ROTATION_CONFIG.MAX_FILES,
        }),
      ],
    });
  }

  /**
   * Logs a message to the file.
   * @param {string} level - The log level.
   * @param {string} message - The log message.
   * @param {string} [context] - The context of the log.
   */
  log(level: string, message: string, context?: string): void {
    this.logger.log(level, message, { context });
  }

  /**
   * Logs an error message to the file.
   * @param {string} message - The error message.
   * @param {string} trace - The stack trace.
   * @param {string} [context] - The context of the log.
   */
  error(message: string, trace: string, context?: string): void {
    this.logger.error(message, { trace, context });
  }
}

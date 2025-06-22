import * as winston from 'winston';
import { ILoggerTransport } from '../logger.interface';
import { LOGGER_LEVELS } from '../constants/logger.constants';

/**
 * Console Transport
 *
 * This transport outputs logs to the console.
 * @class ConsoleTransport
 * @implements {ILoggerTransport}
 */
export class ConsoleTransport implements ILoggerTransport {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: LOGGER_LEVELS.DEBUG, // Log all levels (debug, info, warn, error)
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.colorize(),
        winston.format.printf(
          ({
            timestamp,
            level,
            message,
            context,
          }: {
            timestamp: string;
            level: string;
            message: string;
            context?: string;
          }) => {
            return `[${timestamp}] [${level}] [${context || 'Application'}] ${message}`;
          },
        ),
      ),
      transports: [new winston.transports.Console()],
    });
  }

  /**
   * Logs a message to the console.
   * @param {string} level - The log level.
   * @param {string} message - The log message.
   * @param {string} [context] - The context of the log.
   */
  log(level: string, message: string, context?: string): void {
    this.logger.log(level, message, { context });
  }

  /**
   * Logs an error message to the console.
   * @param {string} message - The error message.
   * @param {string} trace - The stack trace.
   * @param {string} [context] - The context of the log.
   */
  error(message: string, trace: string, context?: string): void {
    this.logger.error(message, { trace, context });
  }
}

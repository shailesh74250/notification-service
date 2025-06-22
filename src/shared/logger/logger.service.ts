import { Injectable } from '@nestjs/common';
import { ILoggerTransport } from './logger.interface';
import { ConsoleTransport } from './transports/console.transport';
import { FileTransport } from './transports/file.transport';
import { ConfigService } from '@nestjs/config';
import {
  LOGGER_CONFIG,
  LOGGER_LEVELS,
  LOGGER_TRANSPORTS,
} from './constants/logger.constants';
import { LogSanitizer } from './logger.sanitizer';

/**
 * Logger Service
 *
 * This service provides a configurable logger with multiple transports.
 * @class LoggerService
 * @decorator @Injectable()
 */
@Injectable()
export class LoggerService {
  private transports: ILoggerTransport[] = [];
  private allowedLevels: Set<string>;

  constructor(private configService: ConfigService) {
    this.initializeTransports();
    this.allowedLevels = new Set(
      (
        this.configService.get<string>('LOGGER_ALLOWED_LEVELS') ||
        LOGGER_CONFIG.DEFAULT_ALLOWED_LEVELS.join(',')
      )
        .split(',')
        .map((level) => level.trim()),
    );
  }

  /**
   * Initializes the logger transports based on configuration.
   * @private
   */
  private initializeTransports(): void {
    const transportsConfig = this.configService.get<{ TRANSPORTS: string }>(
      'LOGGER',
    );
    const transports = (transportsConfig &&
      transportsConfig.TRANSPORTS.split(',')) || [LOGGER_TRANSPORTS.CONSOLE];

    transports.forEach((transport) => {
      switch (transport) {
        case LOGGER_TRANSPORTS.CONSOLE:
          this.transports.push(new ConsoleTransport());
          break;
        case LOGGER_TRANSPORTS.FILE:
          this.transports.push(new FileTransport());
          break;
        default:
          throw new Error(`Unsupported transport: ${transport}`);
      }
    });
  }

  /**
   * Logs a message with the specified level and context.
   * @param {string} level - The log level.
   * @param {string} message - The log message.
   * @param {string} [context] - The context of the log.
   */
  log(level: string, message: string, context?: string): void {
    if (this.allowedLevels.has(level)) {
      const sanitizedMessage = LogSanitizer.sanitizeLogData(message);
      this.transports.forEach((transport) =>
        transport.log(level, sanitizedMessage, context),
      );
    }
  }

  /**
   * Logs an error message with a stack trace and context.
   * @param {string} message - The error message.
   * @param {string} trace - The stack trace.
   * @param {string} [context] - The context of the log.
   */
  error(message: string, trace: string, context?: string): void {
    if (this.allowedLevels.has(LOGGER_LEVELS.ERROR)) {
      const sanitizedMessage = LogSanitizer.sanitizeLogData(message);
      const sanitizedTrace = LogSanitizer.sanitizeErrorTrace(trace);
      this.transports.forEach((transport) =>
        transport.error(sanitizedMessage, sanitizedTrace, context),
      );
    }
  }

  /**
   * Logs a warning message with context.
   * @param {string} message - The warning message.
   * @param {string} [context] - The context of the log.
   */
  warn(message: string, context?: string): void {
    this.log(LOGGER_LEVELS.WARN, message, context);
  }

  /**
   * Logs a debug message with context.
   * @param {string} message - The debug message.
   * @param {string} [context] - The context of the log.
   */
  debug(message: string, context?: string): void {
    this.log(LOGGER_LEVELS.DEBUG, message, context);
  }

  /**
   * Logs an info message with context.
   * @param {string} message - The info message.
   * @param {string} [context] - The context of the log.
   */
  info(message: string, context?: string): void {
    this.log(LOGGER_LEVELS.INFO, message, context);
  }
}

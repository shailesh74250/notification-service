/**
 * Logger Constants
 *
 * This file contains static configuration and constants for the logger.
 */

export const LOGGER_LEVELS = {
  INFO: 'info',
  ERROR: 'error',
  WARN: 'warn',
  DEBUG: 'debug',
};

export const LOGGER_TRANSPORTS = {
  CONSOLE: 'console',
  FILE: 'file',
};

export const LOGGER_CONFIG = {
  DEFAULT_TRANSPORTS: [LOGGER_TRANSPORTS.CONSOLE],
  DEFAULT_ALLOWED_LEVELS: [
    LOGGER_LEVELS.INFO,
    LOGGER_LEVELS.ERROR,
    LOGGER_LEVELS.WARN,
    LOGGER_LEVELS.DEBUG,
  ],
  FILE_ROTATION_CONFIG: {
    FILENAME: 'logs/application-%DATE%.log',
    DATE_PATTERN: 'YYYY-MM-DD',
    MAX_SIZE: '2m', // Rotate at 2MB
    MAX_FILES: '14d', // Keep logs for 14 days
  },
};

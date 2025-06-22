/**
 * Log Sanitizer
 *
 * This utility removes sensitive information from log messages.
 * @class LogSanitizer
 */
export class LogSanitizer {
  /**
   * Sanitizes a log message by removing sensitive information.
   * @param {string} message - The log message.
   * @returns {string} The sanitized log message.
   */
  static sanitizeLogData(message: string): string {
    // Example: Remove email addresses
    return message.replace(
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      '[REDACTED]',
    );
  }

  /**
   * Sanitizes an error stack trace by removing sensitive information.
   * @param {string} trace - The error stack trace.
   * @returns {string} The sanitized stack trace.
   */
  static sanitizeErrorTrace(trace: string): string {
    // Example: Remove file paths or sensitive data from stack traces
    return trace.replace(/\(.*\)/g, '(REDACTED)');
  }
}

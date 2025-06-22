/**
 * Logger Transport Interface
 *
 * This interface defines the contract for all logger transports.
 * @interface ILoggerTransport
 */
export interface ILoggerTransport {
  /**
   * Logs a message with a specific level and context.
   * @param {string} level - The log level (e.g., info, error, warn, debug).
   * @param {string} message - The log message.
   * @param {string} [context] - The context of the log (e.g., class or module name).
   */
  log(level: string, message: string, context?: string): void;

  /**
   * Logs an error message with a stack trace and context.
   * @param {string} message - The error message.
   * @param {string} trace - The stack trace.
   * @param {string} [context] - The context of the log.
   */
  error(message: string, trace: string, context?: string): void;
}

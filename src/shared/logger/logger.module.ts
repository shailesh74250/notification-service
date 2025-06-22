import { Module, Global } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { ConfigService } from '@nestjs/config'; //Vipul

/**
 * Logger Module
 *
 * This module provides a configurable logger service that can be used across the application.
 * @decorator @Global
 * @decorator @Module
 */
@Global() // Makes the module available globally
@Module({
  providers: [
    LoggerService,
    ConfigService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [LoggerService], // Export LoggerService for use in other modules
})
export class LoggerModule {}

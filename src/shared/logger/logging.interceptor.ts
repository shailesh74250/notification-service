import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';
import { Response, Request } from 'express';

/**
 * @class LoggingInterceptor
 * @description Interceptor that logs the details of each request and response.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  /**
   * Intercepts the request and response to log their details.
   * @param context {ExecutionContext} - The execution context of the request.
   * @param next {CallHandler} - The next handler in the request pipeline.
   * @returns {Observable<any>} - The observable stream of the response.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const response: Response = context.switchToHttp().getResponse<Response>();
    const { method, url, headers, body } = request;
    const now = Date.now();
    const currentTime = new Date().toISOString();

    console.log('🚀 Interceptor triggered!');

    console.log('🚀 Incoming Request:', request.method, request.url);

    this.logger.log(
      ` Time: ${currentTime}
        Method: ${method}
        URL: ${url}
        Headers: ${JSON.stringify(headers)}
        Body: ${JSON.stringify(body)}
      `,
      'Incoming Request',
    );

    return next.handle().pipe(
      tap(() => {
        const { status } = response;
        const contentLength = response.getHeader('content-length');
        const responseTime = Date.now() - now;
        const responseTimeFormatted = `${responseTime}ms`;
        const responseTimeISO = new Date().toISOString();

        console.log('🚀 Response Sent!');

        this.logger.log(
          `   Time: ${responseTimeISO}
              Method: ${method}
              URL: ${url}
              Status Code: ${status}
              Content Length: ${contentLength}
              Response Time: ${responseTimeFormatted}
            `,
          'Outgoing Response',
        );
      }),
    );
  }
}

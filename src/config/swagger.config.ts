import { registerAs } from '@nestjs/config';

/**
 * Swagger configuration for Azilen NestJS API.
 *
 * @constant {Function} swaggerConfig - The configuration function for Swagger.
 */
export const swaggerConfig = registerAs('swagger', () => ({
  title: 'Azilen NestJS API',
  description: 'API documentation for Azilen NestJS',
  version: '1.0',
  tag: 'users',
  documentRoute: 'api',
}));

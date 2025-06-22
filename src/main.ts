import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './shared/logger/logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from './shared/logger/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);
  const configService = app.get(ConfigService);
  const loggerService = new LoggerService(configService);

  app.useGlobalInterceptors(new LoggingInterceptor(loggerService));

  if (process.env.NODE_ENV !== 'production') {
    const swaggerConfig = app.get(ConfigService).get<any>('swagger');
    if (swaggerConfig) {
      /**
       * Swagger configuration object.
       *
       * @constant {DocumentBuilder} swaggerConfig - The configuration object for Swagger.
       */
      const swagger = new DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setVersion(swaggerConfig.version)
        .addTag(swaggerConfig.tag)
        .build();

      /**
       * Swagger document setup.
       *
       * @description Sets up the Swagger module with the specified configuration and route.
       */
      const document = SwaggerModule.createDocument(app, swagger);
      SwaggerModule.setup(swaggerConfig.documentRoute, app, document);
    }
  }

  logger.info(
    `Application started at ${process.env.PORT ?? 3000}`,
    'Azilen NestJS',
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './shared/logger/logger.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import loggerConfig from './config/logger.config';
import { swaggerConfig } from './config/swagger.config';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [swaggerConfig, databaseConfig, loggerConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

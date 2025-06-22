import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerService } from '../../shared/logger/logger.service';
import { sequelizeFactory } from './sql/sequelize.config';
import databaseConfig from 'src/config/database.config';

/**
 * DatabaseModule provides the database configuration and initialization.
 *
 * @module DatabaseModule
 */
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService, LoggerService],
      useFactory: sequelizeFactory,
    }),
  ],
})
export class DatabaseModule {}

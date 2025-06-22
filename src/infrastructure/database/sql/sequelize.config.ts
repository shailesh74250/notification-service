import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../../../shared/logger/logger.service';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

/**
 * Sequelize Configuration
 *
 * This file configures Sequelize for the application.
 * @function sequelizeFactory
 * @param {ConfigService} configService - The configuration service.
 * @param {LoggerService} logger - The logger service.
 * @returns {Promise<SequelizeModuleOptions>} - The Sequelize module options.
 */
export const sequelizeFactory = async (
  configService: ConfigService,
  logger: LoggerService,
): Promise<SequelizeModuleOptions> => {
  const config = configService.get('database');

  // Return the Sequelize module options
  return {
    dialect: config.dialect,
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    models: [__dirname + '/../../../**/*.db.entity.js'], // Load all entities
    logging:
      (config.logging && ((msg) => logger.debug(msg, 'Sequelize'))) || false, // Use custom logger
    pool: {
      max: 10, // Maximum number of connections in the pool
      min: 0, // Minimum number of connections in the pool
      acquire: 30000, // Maximum time (in milliseconds) to acquire a connection before throwing an error
      idle: 10000, // Maximum time (in milliseconds) a connection can be idle before being released
    },
    dialectOptions:
      (config.ssl && {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Adjust based on your SSL configuration
        },
      }) ||
      {},
  };
};

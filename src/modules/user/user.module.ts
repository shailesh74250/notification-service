import { Module } from '@nestjs/common';
import { UserController } from './api/rest/user.controller';
import { UserService } from './domain/services/user.service';
import { UserRepository } from './infrastructure/database/sql/repositories/user.repository';
import { UserDbEntity } from './infrastructure/database/sql/entities/user.db.entity';

/**
 * User Module
 *
 * This module handles all user-related operations, including API endpoints, services, and database interactions.
 *
 * @module UserModule
 */
@Module({
  imports: [],
  controllers: [
    /**
     * UserController
     *
     * Handles HTTP requests related to users.
     */
    UserController,
  ],
  providers: [
    /**
     * UserService
     *
     * Provides business logic related to users.
     */
    UserService,
    /**
     * UserRepository
     *
     * Handles database operations related to users.
     */
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'UserDbEntity',
      useValue: UserDbEntity,
    },
  ],
  exports: [UserService],
})
export class UserModule {}

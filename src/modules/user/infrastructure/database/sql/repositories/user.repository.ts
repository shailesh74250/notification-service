import { Inject, Injectable } from '@nestjs/common';
import { UserDbEntity } from '../entities/user.db.entity';
import { CreateUserDto } from '../../../../domain/dto/create-user.dto';
import { UpdateUserDto } from '../../../../domain/dto/update-user.dto';
import { IUserRepository } from '../../user.repository.interface';
import { User } from '../../../../domain/entities/user.entity';
import { UserMapper } from './../mapper/user.mapper';

/**
 * UserRepository handles all database operations related to users.
 *
 * @repository UserRepository
 */
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject('UserDbEntity')
    private readonly userModel: typeof UserDbEntity,
  ) {}

  /**
   * Creates a new user.
   *
   * @param createUserDto - Data Transfer Object for creating a user
   * @returns The created user
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userDbEntity = UserMapper.toDbEntityFromCreateDto(createUserDto);
    const user = await this.userModel.create(userDbEntity as UserDbEntity);
    return UserMapper.toDomain(user);
  }

  /**
   * Retrieves all users.
   *
   * @returns An array of users
   */
  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.findAll();
    return users.map((user) => UserMapper.toDomain(user));
  }

  /**
   * Retrieves a user by ID.
   *
   * @param id - The ID of the user to retrieve
   * @returns The user with the specified ID
   */
  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return UserMapper.toDomain(user);
  }

  /**
   * Updates a user by ID.
   *
   * @param id - The ID of the user to update
   * @param updateUserDto - Data Transfer Object for updating a user
   * @returns The updated user
   */
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userDbEntity = UserMapper.toDbEntityFromUpdateDto(updateUserDto);
    const [numberOfAffectedRows, [updatedUser]] = await this.userModel.update(
      userDbEntity,
      {
        where: { id },
        returning: true,
      },
    );
    if (numberOfAffectedRows === 0) {
      throw new Error(`User with ID ${id} not found`);
    }
    return UserMapper.toDomain(updatedUser);
  }

  /**
   * Deletes a user by ID.
   *
   * @param id - The ID of the user to delete
   */
  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.destroy({ where: { id } });
    if (result === 0) {
      throw new Error(`User with ID ${id} not found`);
    }
  }
}

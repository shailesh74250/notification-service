import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '../../infrastructure/database/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

/**
 * UserService handles all business logic related to users.
 *
 * @service UserService
 */
@Injectable()
export class UserService {
  /**
   * Constructs a new instance of UserService.
   *
   * @param userRepository - The user repository to be used for database operations
   */
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  /**
   * Creates a new user.
   *
   * @param createUserDto - Data Transfer Object for creating a user
   * @returns The created user
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  /**
   * Retrieves all users.
   *
   * @returns An array of users
   */
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  /**
   * Retrieves a user by ID.
   *
   * @param id - The ID of the user to retrieve
   * @returns The user with the specified ID
   * @throws NotFoundException if the user is not found
   */
  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Updates a user by ID.
   *
   * @param id - The ID of the user to update
   * @param updateUserDto - Data Transfer Object for updating a user
   * @returns The updated user
   * @throws NotFoundException if the user is not found
   */
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.updateUser(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Deletes a user by ID.
   *
   * @param id - The ID of the user to delete
   * @throws NotFoundException if the user is not found
   */
  async deleteUser(id: string): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}

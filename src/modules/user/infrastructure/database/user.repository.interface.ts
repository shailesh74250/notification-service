import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { UpdateUserDto } from '../../domain/dto/update-user.dto';
import { User } from '../../domain/entities/user.entity';

/**
 * Interface for User repository to abstract database operations.
 *
 * @interface IUserRepository
 */
export interface IUserRepository {
  /**
   * Creates a new user.
   *
   * @param createUserDto - Data Transfer Object for creating a user
   * @returns The created user
   */
  createUser(createUserDto: CreateUserDto): Promise<User>;

  /**
   * Retrieves all users.
   *
   * @returns An array of users
   */
  getAllUsers(): Promise<User[]>;

  /**
   * Retrieves a user by ID.
   *
   * @param id - The ID of the user to retrieve
   * @returns The user with the specified ID
   */
  getUserById(id: string): Promise<User>;

  /**
   * Updates a user by ID.
   *
   * @param id - The ID of the user to update
   * @param updateUserDto - Data Transfer Object for updating a user
   * @returns The updated user
   */
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;

  /**
   * Deletes a user by ID.
   *
   * @param id - The ID of the user to delete
   */
  deleteUser(id: string): Promise<void>;
}

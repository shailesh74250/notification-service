import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { UpdateUserDto } from '../../domain/dto/update-user.dto';
import { UserService } from '../../domain/services/user.service';
import { User } from '../../domain/entities/user.entity';

/**
 * UserController handles all user-related HTTP requests.
 *
 * @controller UserController
 * @tag users
 */
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Creates a new user.
   *
   * @param createUserDto - Data Transfer Object for creating a user
   * @returns The created user
   * @operation createUser
   * @response 201 - The created user
   * @response 400 - Bad Request
   */
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The created user', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({
    type: CreateUserDto,
    description: 'The data needed to create a new user',
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  /**
   * Retrieves all users.
   *
   * @returns An array of users
   * @operation getAllUsers
   * @response 200 - An array of users
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'An array of users', type: [User] })
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  /**
   * Retrieves a user by ID.
   *
   * @param id - The ID of the user to retrieve
   * @returns The user with the specified ID
   * @operation getUserById
   * @response 200 - The user with the specified ID
   * @response 404 - User not found
   */
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user with the specified ID',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', description: 'The ID of the user to retrieve' })
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  /**
   * Updates a user by ID.
   *
   * @param id - The ID of the user to update
   * @param updateUserDto - Data Transfer Object for updating a user
   * @returns The updated user
   * @operation updateUser
   * @response 200 - The updated user
   * @response 404 - User not found
   */
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'The updated user', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', description: 'The ID of the user to update' })
  @ApiBody({
    type: UpdateUserDto,
    description: 'The data needed to update a user',
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  /**
   * Deletes a user by ID.
   *
   * @param id - The ID of the user to delete
   * @returns A message indicating the result of the deletion
   * @operation deleteUser
   * @response 200 - User deleted successfully
   * @response 404 - User not found
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', description: 'The ID of the user to delete' })
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}

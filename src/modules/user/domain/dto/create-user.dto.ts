import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * Data Transfer Object for creating a user.
 *
 * @class CreateUserDto
 */
export class CreateUserDto {
  /**
   * The name of the user.
   *
   * @example 'John Doe'
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * The email of the user.
   *
   * @example 'john.doe@example.com'
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * The password of the user.
   *
   * @example 'password123'
   */
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}

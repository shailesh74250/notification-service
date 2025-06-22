import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

/**
 * Data Transfer Object for updating a user.
 *
 * @class UpdateUserDto
 */
export class UpdateUserDto {
  /**
   * The name of the user.
   *
   * @example 'John Doe'
   */
  @IsString()
  @IsOptional()
  name?: string;

  /**
   * The email of the user.
   *
   * @example 'john.doe@example.com'
   */
  @IsEmail()
  @IsOptional()
  email?: string;

  /**
   * The password of the user.
   *
   * @example 'password123'
   */
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;
}

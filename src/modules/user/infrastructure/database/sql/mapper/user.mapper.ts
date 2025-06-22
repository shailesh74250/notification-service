import { CreateUserDto } from '../../../../domain/dto/create-user.dto';
import { UpdateUserDto } from '../../../../domain/dto/update-user.dto';
import { UserDbEntity } from '../entities/user.db.entity';
import { User } from '../../../../domain/entities/user.entity';

/**
 * UserMapper handles the mapping between DTOs and database entities.
 *
 * @class UserMapper
 */
export class UserMapper {
  /**
   * Maps a CreateUserDto to a UserDbEntity.
   *
   * @param createUserDto - Data Transfer Object for creating a user
   * @returns A partial UserDbEntity with the mapped properties
   */
  static toDbEntityFromCreateDto(
    createUserDto: CreateUserDto,
  ): Partial<UserDbEntity> {
    return {
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    };
  }

  /**
   * Maps an UpdateUserDto to a UserDbEntity.
   *
   * @param updateUserDto - Data Transfer Object for updating a user
   * @returns A partial UserDbEntity with the mapped properties
   */
  static toDbEntityFromUpdateDto(
    updateUserDto: UpdateUserDto,
  ): Partial<UserDbEntity> {
    return {
      name: updateUserDto.name,
      email: updateUserDto.email,
      password: updateUserDto.password,
    };
  }

  /**
   * Maps a UserDbEntity to a User domain entity.
   *
   * @param userDbEntity - The UserDbEntity to convert
   * @returns The User domain entity
   */
  static toDomain(userDbEntity: UserDbEntity): User {
    const { id, name, email, password, createdAt, updatedAt } = userDbEntity;
    return new User(id, name, email, password, createdAt, updatedAt);
  }
}

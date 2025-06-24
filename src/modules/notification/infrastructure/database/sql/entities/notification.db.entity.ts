import {
  Table,
  Column,
  Model,
  DataType,
  BeforeUpdate,
} from 'sequelize-typescript';

/**
 * User database entity representing a user in the database.
 *
 * @class UserDbEntity
 * @extends Model
 */
@Table({
  tableName: 'users',
  timestamps: true,
})
export class UserDbEntity extends Model<UserDbEntity> {
  /**
   * The unique identifier of the user.
   *
   * @column
   * @type {string}
   */
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  /**
   * The name of the user.
   *
   * @column
   * @type {string}
   */
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  /**
   * The email of the user.
   *
   * @column
   * @type {string}
   */
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  /**
   * The password of the user.
   *
   * @column
   * @type {string}
   */
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  /**
   * The date and time when the user was created.
   *
   * @column
   * @type {Date}
   */
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  /**
   * The date and time when the user was last updated.
   *
   * @column
   * @type {Date}
   */
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  /**
   * Hook to update the updatedAt field before updating the record.
   */
  @BeforeUpdate
  static updateTimestamp(instance: UserDbEntity) {
    instance.updatedAt = new Date();
  }
}

export default UserDbEntity;

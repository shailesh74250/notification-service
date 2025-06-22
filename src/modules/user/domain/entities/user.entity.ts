/**
 * User entity representing a user in the domain layer.
 *
 * @class User
 */
export class User {
  /**
   * The unique identifier of the user.
   *
   * @type {string}
   */
  id: string;

  /**
   * The name of the user.
   *
   * @type {string}
   */
  name: string;

  /**
   * The email of the user.
   *
   * @type {string}
   */
  email: string;

  /**
   * The password of the user.
   *
   * @type {string}
   */
  password: string;

  /**
   * The date and time when the user was created.
   *
   * @type {Date}
   */
  createdAt: Date;

  /**
   * The date and time when the user was last updated.
   *
   * @type {Date}
   */
  updatedAt: Date;

  /**
   * Constructs a new instance of the User entity.
   *
   * @param id - The unique identifier of the user
   * @param name - The name of the user
   * @param email - The email of the user
   * @param password - The password of the user
   * @param createdAt - The date and time when the user was created
   * @param updatedAt - The date and time when the user was last updated
   */
  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

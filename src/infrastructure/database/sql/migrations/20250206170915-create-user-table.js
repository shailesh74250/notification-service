'use strict';

/**
 * @module CreateUsersMigration
 * @description Migration for creating the Users table
 */
module.exports = {
  /**
   * @function up
   * @description Method to create the Users table
   * @param {object} queryInterface - The interface for querying the database
   * @param {object} Sequelize - The Sequelize library
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  /**
   * @function down
   * @description Method to drop the Users table
   * @param {object} queryInterface - The interface for querying the database
   * @param {object} Sequelize - The Sequelize library
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};

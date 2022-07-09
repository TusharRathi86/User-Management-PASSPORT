'use strict';
const { roles } = require('../utils/constants')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('logininfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      Role: {
        type: Sequelize.STRING,
        enum: [roles.admin, roles.client],
        default: roles.client,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('logininfos');
  }
};
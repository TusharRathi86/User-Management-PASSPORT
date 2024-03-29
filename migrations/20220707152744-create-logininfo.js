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
      password: {
        type: Sequelize.STRING
      },
      Role: {
        type: Sequelize.STRING,
        enum: [roles.admin, roles.client],
        defaultValue: roles.client,
      },
      email: {
        type: Sequelize.STRING,
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
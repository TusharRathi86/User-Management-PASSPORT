'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'userinfos',
        'email'
      ),
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.dropTable('userinfos')
    ])
  }
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'logininfos',
        'username'
      ),
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.dropTable('logininfos')
    ])
  }
};

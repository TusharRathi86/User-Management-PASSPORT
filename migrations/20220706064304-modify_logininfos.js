'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'logininfos',
        'user_id',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      ),
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('logininfos', 'user_id'),
    ])
  }
};

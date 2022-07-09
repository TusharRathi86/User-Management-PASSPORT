'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'logininfos',
        'Role',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('logininfos', 'Role'),
    ])
  }
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'userinfos',
        'image',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('userinfos', 'image'),
    ])
  }
};

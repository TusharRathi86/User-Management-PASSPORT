'use strict';
const { roles } = require('../utils/constants')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logininfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  logininfo.init({
    password: DataTypes.STRING,
    Role: {
      type: DataTypes.STRING,
      defaultValue: roles.client,
    },
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'logininfo',
  });
  return logininfo;
};
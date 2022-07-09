'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userinfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userinfo.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.DOUBLE,
    address: DataTypes.STRING,
    image: DataTypes.STRING, /* /\*******\/ */
  }, {
    sequelize,
    modelName: 'userinfo',
  });
  return userinfo;
};
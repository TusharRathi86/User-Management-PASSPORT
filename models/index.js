'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const logininfo = require('../models/logininfo');
const userinfo = require('../models/userinfo');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Tables 
db.userinfos = require('../models/userinfo')(sequelize, DataTypes)
db.logininfos = require('../models/logininfo')(sequelize, DataTypes)
db.otps = require('../models/otp')(sequelize, DataTypes)

// Associations

// <!-- For records --!>
db.logininfos.hasMany(db.userinfos, { foreignKey: 'userId' })
db.userinfos.belongsTo(db.logininfos, { foreignKey: 'userId' })

// Synchronization
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('re-sync done!')
  })
  .catch(err => {
    console.log('Error' + err.message)
  })

module.exports = db;
require('dotenv').config();
const Sequelize = require('sequelize');
const config = require('.');

const sequelize = new Sequelize(config.nameDB, config.userDB, config.passwordDB, {
  dialect: config.dialectDB,
  host: config.hostDB,
  port: config.portDB,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
module.exports = {
  sequelize,
  Sequelize,
};

const Sequelize = require('sequelize');
const config = require('.');
const sequelize = new Sequelize(config.nameDB, config.userDB, config.passwordDB, {
  dialect: config.dialectDB,
  host: config.hostDB,
  port: config.portDB,
  synchronize: true,
  pool: {
    max: 64,
    min: 2,
    acquire: 300000,
    idle: 30000,
    encrypt: false,
  },
  requestTimeout: 30000,
});
module.exports = {
  sequelize,
  Sequelize,
};

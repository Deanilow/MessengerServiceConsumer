const Sequelize = require("sequelize");
const dbConfig = require("./db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  define: {
    timestamps: false,
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  dialectOptions: {
    options: {
      encrypt: false,  // Opción para habilitar o deshabilitar la encriptación
      trustServerCertificate: true  // Opción para confiar en el certificado del servidor
    }
  }
});


const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.messages = require("../model/message")(sequelize, Sequelize);
db.messagesDetailBody = require("../model/messageDetailBody")(sequelize, Sequelize);
db.messagesDetailFile = require("../model/messageDetailFile")(sequelize, Sequelize);

module.exports = db;
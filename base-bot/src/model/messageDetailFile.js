const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const messagesDetailPath = sequelize.define(
    'messagesDetailPath',
    {
      id: {
        type: 'UNIQUEIDENTIFIER',
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      idMessage: {
        type: 'UNIQUEIDENTIFIER',
        allowNull: false,
        references: {
          model: 'messages',
          key: 'id',
        },
      },
      file_url: {
        type: DataTypes.STRING(3000),
        allowNull: true
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      order:{
        type: DataTypes.INTEGER,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false
      },
      creationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: 'DATETIME',
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: true
      },
      updateDate: {
        type: DataTypes.DATE,
        allowNull: true,
        type: 'DATETIME',
      },
      deletedBy: {
        type: DataTypes.STRING,
        allowNull: true
      },
      deletionDate: {
        type: DataTypes.DATE,
        allowNull: true,
        type: 'DATETIME',
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: 'messagesDetailPath', // Especifica el nombre de la tabla
      // ... otras opciones
    }
  );

  return messagesDetailPath;
};
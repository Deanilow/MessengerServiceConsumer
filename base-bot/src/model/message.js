const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const message = sequelize.define(
    'messages',
    {
      id: {
        type: 'UNIQUEIDENTIFIER',
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      to: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      from: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM(["Pending", "Error", "Processing", "Sent"]),
        allowNull: false
      },
      description_status: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      attempts: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      clientIpAddress: {
        type: DataTypes.STRING,
        allowNull: true
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
      tableName: 'messages', // Especifica el nombre de la tabla
      // ... otras opciones
    }
  );


  message.updateStatusById = async (id, status, description_status) => {

    let result = {
      success: true,
      message: ""
    }

    try {

      const updateResult = await message.update(
        { status: status, description_status: description_status }, // Campos a actualizar y sus nuevos valores
        { where: { id } } // Criterio de actualización: por id
      );

      if (!updateResult) {
        result.success = false;
        result.message = 'Error updateResult updateStatusById.';
        return result;
      }
      result.message = `Status Actualizado `;
      return result;

    } catch (error) {
      result.success = false;
      result.message = error.message;
    }
  };

  return message;
};
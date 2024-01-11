const { sequelize, Sequelize } = require('../../../configuration/mssql');

const messageDetailStore = {
  async updateStatusMessage(id, status , statusDescription) {
    try {
      await sequelize.query(
        'UPDATE [wsp].[Messages] SET [Status] = :status ,  [StatusDescription] = :status WHERE id = :id',
        {
          replacements: { status, statusDescription , id },
          type: Sequelize.QueryTypes.UPDATE,
          timeout: 8000000,
        },
      );
    } catch (error) {
      console.error('Error en la actualización del estado del mensaje:', error.message);
    }
  },
};

module.exports.init = () => Object.assign(Object.create(messageDetailStore), {});

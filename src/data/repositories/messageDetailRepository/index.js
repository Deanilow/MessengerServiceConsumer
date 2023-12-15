const { sequelize, Sequelize } = require('../../../configuration/mssql');

const messageDetailStore = {
  async updateStatusMessage(id, status) {
    await sequelize.query(
      'UPDATE Messages SET Status = :status WHERE id = :id',
      {
        replacements: { status, id },
        type: Sequelize.QueryTypes.UPDATE,
      },
    );
  },
};

module.exports.init = () => Object.assign(Object.create(messageDetailStore), {});

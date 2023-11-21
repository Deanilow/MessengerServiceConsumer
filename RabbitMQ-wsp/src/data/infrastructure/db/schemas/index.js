const { MessageDetailDao } = require('./MessageDetail');

module.exports.create = () => ({
  MessageDetail: MessageDetailDao,
});

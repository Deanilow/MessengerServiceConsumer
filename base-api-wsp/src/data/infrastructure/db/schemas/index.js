const { PostDao } = require('./Post');
const { UserDao } = require('./User');
const { MessageDao } = require('./Message');
const { MessageDetailDao } = require('./MessageDetail');

module.exports.create = () => ({
  Post: PostDao,
  User: UserDao,
  Message: MessageDao,
  MessageDetail: MessageDetailDao,
});

const db = require("../config/sql");

const messagesModel = db.messages;
const messagesDetailBodyModel = db.messagesDetailBody;
const messagesDetailFileModel = db.messagesDetailFile;

module.exports = { messagesModel, messagesDetailBodyModel, messagesDetailFileModel }
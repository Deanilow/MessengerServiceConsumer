/**
  * This is the app Model it is decoupled from
  * the Entities used for the databse
*/
class messageDetail {
  constructor({
    _id,
    messageId,
    fileUrl,
    text,
    order,
    createdBy,
    created,
  } = {}) {
    this.id = _id;
    this.messageId = messageId;
    this.fileUrl = fileUrl;
    this.text = text;
    this.order = order;
    this.createdBy = createdBy;
    this.created = created;
  }
}

module.exports = messageDetail;

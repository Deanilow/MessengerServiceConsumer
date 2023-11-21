/**
  * This is the app Model it is decoupled from
  * the Entities used for the databse
*/
class Message {
  constructor({
    _id,
    to,
    from,
    createdBy,
    created,
  } = {}) {
    this.id = _id;
    this.to = to;
    this.from = from;
    this.createdBy = createdBy;
    this.created = created;
  }
}

module.exports = Message;

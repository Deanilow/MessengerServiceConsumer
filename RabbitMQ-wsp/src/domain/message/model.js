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

// class Message {
//   constructor({
//     _id,
//     to,
//     from,
//     clientIpAddress,
//     createdBy,
//     created,
//     updatedBy,
//     udpated,
//     deletedBy,
//     deleted,
//     isDeleted,
//   } = {}) {
//     this.id = _id;
//     this.to = to;
//     this.from = from;
//     this.clientIpAddress = clientIpAddress;
//     this.createdBy = createdBy;
//     this.created = created;
//     this.updatedBy = updatedBy;
//     this.udpated = udpated;
//     this.deletedBy = deletedBy;
//     this.deleted = deleted;
//     this.isDeleted = isDeleted;
//   }
// }
module.exports = Message;

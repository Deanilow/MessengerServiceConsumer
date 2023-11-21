const moment = require('moment');
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');

const {
  model,
  Schema,
} = require('mongoose');

const MessageSchema = new Schema({
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  clientIpAddress: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  created: {
    type: mongoose.Schema.Types.Date,
  },
  updatedBy: {
    type: mongoose.Schema.Types.String,
  },
  udpated: {
    type: mongoose.Schema.Types.Date,
  },
  deletedBy: {
    type: mongoose.Schema.Types.String,
  },
  deleted: {
    type: mongoose.Schema.Types.Date,
  },
  isDeleted: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
});

MessageSchema.index({ name: 1 });

MessageSchema.index({ name: 1, created: -1 });

MessageSchema.plugin(uniqueValidator);

MessageSchema.pre('save', function save(next) {
  this.created = moment().toJSON();
  return next();
});

const MessageDao = model('Message', MessageSchema);

module.exports = { MessageDao };

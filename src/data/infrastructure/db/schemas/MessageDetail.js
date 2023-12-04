const moment = require('moment');
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');

const {
  model,
  Schema,
} = require('mongoose');

const MessageDetailSchema = new Schema({
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  fileUrl: {
    type: mongoose.Schema.Types.String,
  },
  text: {
    type: String,
    required: true,
  },
  attempts: {
    type: mongoose.Schema.Types.Number,
    required: true,
    default: 0,
  },
  order: {
    type: mongoose.Schema.Types.Number,
    required: false,
    default: 0,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'error', 'processing', 'sent'],
    message: 'Status should be one of: pending, error, processing, sent',
    default: 'pending',
  },
  descriptionStatus: {
    type: mongoose.Schema.Types.String,
    required: true,
    default: 'pending in api',
  },
  clientIpAddress: {
    type: mongoose.Schema.Types.String,
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
    required: true,
    default: false,
  },
});

MessageDetailSchema.index({ name: 1 });

MessageDetailSchema.index({ name: 1, created: -1 });

MessageDetailSchema.plugin(uniqueValidator);

MessageDetailSchema.pre('save', function save(next) {
  this.created = moment().toJSON();
  return next();
});

const MessageDetailDao = model('MessageDetail', MessageDetailSchema);

module.exports = { MessageDetailDao };

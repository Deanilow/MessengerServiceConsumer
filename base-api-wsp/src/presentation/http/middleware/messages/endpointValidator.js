/* eslint-disable no-underscore-dangle */
const {
  body,
  // param,
  validationResult,
} = require('express-validator');
const { errorHandler } = require('@dimosbotsaris/express-error-handler');
const errors = require('../../../../common/errors');

// const isMongoObjectID = (value) => /^[0-9a-fA-F]{24}$/.test(value);

const requireBodyForCreateMessage = () => [
  body('to')
    .exists()
    .withMessage({
      message: 'to not provided. Make sure you have a "to" property in your body params.',
      status: 400,
    }),
  body('from')
    .exists()
    .withMessage({
      message: 'from not provided. Make sure you have a "from" property in your body params.',
      status: 400,
    }),
  body('messages')
    .exists()
    .isArray()
    .withMessage({
      message: 'messages not provided. Make sure you have a "messages" property in your body params.',
      status: 400,
    })
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('messages should be an array');
      }
      if (value.some((message) => !message.text)) {
        return false;
      }
      return true;
    })
    .withMessage({
      message: 'text in messages not provided. Make sure you have a "text in messages" property in your body params.',
      status: 400,
    }),
];

const requireBodyForUpdateMessage = () => [
  body('id')
    .exists()
    .isMongoId()
    .withMessage({
      message: 'id not provided. Make sure you have a "id" property in your body params.',
      status: 400,
    }),
  body('attempts')
    .exists()
    .withMessage({
      message: 'attempts not provided. Make sure you have a "attempts" property in your body params.',
      status: 400,
    }),
  body('status')
    .exists()
    .withMessage({
      message: 'status not provided. Make sure you have a "status" property in your body params.',
      status: 400,
    }),
  body('descriptionStatus')
    .exists()
    .withMessage({
      message: 'descriptionStatus not provided. Make sure you have a "descriptionStatus" property in your body params.',
      status: 400,
    }),
  body('updatedBy')
    .exists()
    .withMessage({
      message: 'updatedBy not provided. Make sure you have a "updatedBy" property in your body params.',
      status: 400,
    }),
  body('udpated')
    .exists()
    .withMessage({
      message: 'udpated not provided. Make sure you have a "udpated" property in your body params.',
      status: 400,
    }),
];

const validate = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const validationError = validationErrors.array({
    onlyFirstError: true,
  })[0];
  const errMsg = validationError?.msg?.message || 'Bad request';
  const errStatus = validationError?.msg?.status || 400;
  return errorHandler({ trace: true })(new errors[errStatus](errMsg, 'BAD_BODY_PARAMS'), req, res, next);
};

const validateCreateMessageBody = () => [
  requireBodyForCreateMessage(),
  validate,
];

const validateUpdateMessageBody = () => [
  requireBodyForUpdateMessage(),
  validate,
];

module.exports = {
  validateCreateMessageBody,
  validateUpdateMessageBody,
};

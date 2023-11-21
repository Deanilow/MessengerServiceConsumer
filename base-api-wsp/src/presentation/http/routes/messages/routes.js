const express = require('express');
const {
  validateCreateMessageBody,
  validateUpdateMessageBody,
} = require('../../middleware/messages/endpointValidator');
const {
  getDefaultPage,
  getDefaultLimit,
} = require('../../utils/pagination');

// eslint-disable-next-line new-cap
const router = express.Router({ mergeParams: true });

function init({
  messagesService,
}) {
  router.get(
    '/',
    (async (req, res) => {
      const messagesList = await messagesService.listMessage({
        to: req.query.to,
        from: req.query.from,
        page: getDefaultPage(parseInt(req.query.page, 10)),
        limit: getDefaultLimit(parseInt(req.query.limit, 10)),
      });
      return res.send(messagesList);
    }),
  );

  router.post(
    '/',
    validateCreateMessageBody(),
    (async (req, res) => {
      const { body, user, ip } = req;
      const newMessage = await messagesService.createMessage({
        to: body.to,
        from: body.from,
        createdBy: user.username,
        clientIpAddress: ip || '',
        arrayBody: body.messages,
      });
      return res.send({
        data: newMessage,
      });
    }),
  );

  router.put(
    '/',
    validateUpdateMessageBody(),
    (async (req, res) => {
      const { body, user, ip } = req;
      const newMessage = await messagesService.createMessage({
        to: body.to,
        from: body.from,
        createdBy: user.username,
        clientIpAddress: ip || '',
        arrayBody: body.messages,
      });
      return res.send({
        data: newMessage,
      });
    }),
  );

  return router;
}

module.exports.init = init;

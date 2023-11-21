// DOMAIN LAYER
// Has the postRepository as a dependency. The messageervice does not know
// nor does it care where the post models came from. This is abstracted away
// by the implementation of the repositories. It just calls the needed repositories
// gets the results and usually applies some business logic on them.
const messageBroker = require('../../presentation/RabbitMQ');

function init({
  messagesRepository,
  messagesDetailRepository,
}) {
  async function listMessage({
    to,
    from,
    limit,
    page,
  }) {
    return messagesRepository.listMessage({
      to,
      from,
      limit,
      page,
    });
  }

  async function createMessage({
    to,
    from,
    clientIpAddress,
    createdBy,
    arrayBody,
  }) {
    const messageResult = await messagesRepository.createMessage({
      to,
      from,
      clientIpAddress,
      createdBy,
    });

    let orderMessage = 0;

    const createMessageDetailsPromises = arrayBody.map((element) => {
      orderMessage += 1;
      return messagesDetailRepository.createMessageDetail({
        messageId: messageResult.id,
        fileUrl: element.fileUrl || '',
        text: element.text,
        order: orderMessage,
        createdBy,
        clientIpAddress,
      });
    });

    await Promise.all(createMessageDetailsPromises);

    messageResult.arrayBody = await messagesDetailRepository.getMessageDetailByMessageId({ messageId: messageResult.id });

    await messageBroker.publishMessage('messagesPending', messageResult);

    return messageResult;
  }

  async function updateStatusMessage({
    id,
    attempts,
    status,
    descriptionStatus,
    updatedBy,
    udpated,
  }) {
    return messagesRepository.updateStatusMessage({
      id,
      attempts,
      status,
      descriptionStatus,
      updatedBy,
      udpated,
    });
  }

  return {
    listMessage,
    createMessage,
    updateStatusMessage,
  };
}

module.exports.init = init;

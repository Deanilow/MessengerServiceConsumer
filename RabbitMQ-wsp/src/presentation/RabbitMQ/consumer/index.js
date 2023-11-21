const amqp = require('amqplib');
const infoging = require('../../../common/logging');
const config = require('../../../configuration');
const { adapterProvider } = require('../../SessionsWsp/51900262844');

function init({
  messagesDetailRepository,
}) {
  async function setupMessageConsumer() {
    try {
      const amqpServer = config.rabbitServer;
      const connection = await amqp.connect(amqpServer);
      const channel = await connection.createChannel();
      const queue = 'messagesPending';
      await channel.assertQueue(queue, {
        durable: true,
        arguments: {
          'x-queue-type': 'quorum',
        },
      });
      channel.prefetch(1);
      channel.consume('messagesPending', async (data) => {
        const messageBuffer = data.content;

        const messageString = messageBuffer.toString();

        const messageObject = JSON.parse(messageString);

        if (messageObject.arrayBody) {
          const messageObjectArrayBodyAsc = messageObject.arrayBody.sort((a, b) => a.order - b.order);

          for (let i = 0; i < messageObjectArrayBodyAsc.length; i += 1) {
            messagesDetailRepository.updateStatusMessageDetail({
              id: messageObjectArrayBodyAsc[i].id,
              attempts: 1,
              status: 'processing',
              descriptionStatus: 'processing in rabbitmq',
            });

            if (messageObjectArrayBodyAsc[i].fileUrl) {
              // eslint-disable-next-line no-await-in-loop
              await adapterProvider.sendMedia(`${messageObject.to}@c.us`, messageObjectArrayBodyAsc[i].fileUrl, messageObjectArrayBodyAsc[i].text || '');
            } else {
              // eslint-disable-next-line no-await-in-loop
              await adapterProvider.sendText(`${messageObject.to}@c.us`, messageObjectArrayBodyAsc[i].text);
            }
            messagesDetailRepository.updateStatusMessageDetail({
              id: messageObjectArrayBodyAsc[i].id,
              attempts: 1,
              status: 'sent',
              descriptionStatus: 'sent message',
            });
          }
        }
        channel.ack(data);
      });
    } catch (err) {
      infoging.error('Failed to connect to RabbitMQ:', err.message);
    }
  }

  return {
    setupMessageConsumer,
  };
}
module.exports.init = init;

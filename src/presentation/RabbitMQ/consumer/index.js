const amqp = require('amqplib');
const path = require('path');
const infoging = require('../../../common/logging');
const config = require('../../../configuration');
const { getNumberArrayActives } = require('../../../common/utils/helper');

function init({ messagesDetailRepository }) {
  async function setupMessageConsumer() {
    try {
      const amqpServer = config.rabbitServer;
      const connection = await amqp.connect(amqpServer);
      const channel = await connection.createChannel();

      getNumberArrayActives().then((NumberArrayActives) => {
        NumberArrayActives.forEach((numberActive) => {
          const queue = `messagesPending-${numberActive}`;
          infoging.info(`RabbitMQ consume : ${queue}`);

          channel.assertQueue(queue, {
            durable: true,
            arguments: {
              'x-queue-type': 'quorum',
            },
          });
          channel.prefetch(1);

          channel.consume(queue, async (data) => {
            const bufferContent = data.content;
            const stringBuffer = bufferContent.toString();
            const dataArrayObject = JSON.parse(stringBuffer);
            for (let xData = 0; xData < dataArrayObject.length; xData += 1) {

              const data = dataArrayObject[xData].data;

                const objArrayMessages = data.messages.sort(
                  (a, b) => a.order - b.order
                );

                for (let i = 0; i < objArrayMessages.length; i += 1) {
                  messagesDetailRepository.updateStatusMessageDetail({
                    id: objArrayMessages[i].id,
                    attempts: 1,
                    status: 'processing',
                    descriptionStatus: 'processing in rabbitmq',
                  });

                  const folderPath = path.join(
                    __dirname,
                    '../../SessionsWsp',
                    data.from
                  );
                  // eslint-disable-next-line import/no-dynamic-require, global-require
                  const { adapterProvider } = require(folderPath);

                  if (objArrayMessages[i].fileUrl) {
                    // eslint-disable-next-line no-await-in-loop
                    await adapterProvider.sendMedia(
                      `${data.to}@c.us`,
                      objArrayMessages[i].fileUrl,
                      objArrayMessages[i].text || ''
                    );
                  } else {
                    // eslint-disable-next-line no-await-in-loop
                    await adapterProvider.sendText(
                      `${data.to}@c.us`,
                      objArrayMessages[i].text
                    );
                  }

                  messagesDetailRepository.updateStatusMessageDetail({
                    id: objArrayMessages[i].id,
                    attempts: 1,
                    status: 'sent',
                    descriptionStatus: 'sent message',
                  });
              }
              
            }

            // if (messageObject && messageObject.data.length > 0) {
            // }
            channel.ack(data);
          });
        });
      });
      infoging.info('RabbitMQ connected');
    } catch (err) {
      infoging.error(`Failed to connect to RabbitMQ: ${err.message} `);
    }
  }

  return {
    setupMessageConsumer,
  };
}
module.exports.init = init;

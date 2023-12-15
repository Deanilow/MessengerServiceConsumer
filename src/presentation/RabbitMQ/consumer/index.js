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

          channel.consume(queue, async (response) => {
            const bufferContent = response.content;
            const stringBuffer = bufferContent.toString();
            const dataArrayObject = JSON.parse(stringBuffer);

            if (dataArrayObject && dataArrayObject.length > 0) {
              for (let xData = 0; xData < dataArrayObject.length; xData += 1) {
                const { data } = dataArrayObject[xData];

                const objArrayMessages = data.messages.sort(
                  (a, b) => a.order - b.order
                );

                for (let i = 0; i < objArrayMessages.length; i += 1) {
                  messagesDetailRepository.updateStatusMessage(
                    data.id,
                    'Proceso'
                  );

                  try {
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

                    messagesDetailRepository.updateStatusMessage(
                      data.id,
                      'Enviado'
                    );
                  } catch (error) {
                    infoging.info(`Error en envio ${data.id} : ${error}`);
                    messagesDetailRepository.updateStatusMessage(
                      data.id,
                      'Error'
                    );
                  }
                }
              }
            }
            channel.ack(response);
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

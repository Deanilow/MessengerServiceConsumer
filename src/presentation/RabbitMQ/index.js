const amqp = require('amqplib');
const logging = require('../../common/logging');
const config = require('../../configuration');

class MessageBroker {
  constructor() {
    this.channel = null;
  }

  async connect() {
    logging.info('Connecting to RabbitMQ...');
    logging.info(config.rabbitServer);
    try {
      const connection = await amqp.connect(config.rabbitServer);
      this.channel = await connection.createChannel();
      const queue = 'messagesPending';

      await this.channel.assertQueue(queue, {
        durable: true,
        arguments: {
          'x-queue-type': 'quorum', // Definir la cola como quórum
        },
      });
      logging.info('RabbitMQ connected');
    } catch (err) {
      logging.error('Failed to connect to RabbitMQ:', err.message);
      logging.error('Failed to connect to RabbitMQ:', err);
    }
  }

  async publishMessage(queue, message) {
    if (!this.channel) {
      logging.error('No RabbitMQ channel available.');
      return;
    }

    try {
      await this.channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(message)),
      );
    } catch (err) {
      logging.info(err);
    }
  }

  async consumeMessage(queue, callback) {
    if (!this.channel) {
      logging.error('No RabbitMQ channel available.');
      return;
    }

    try {
      await this.channel.consume(queue, (message) => {
        const content = message.content.toString();
        const parsedContent = JSON.parse(content);
        callback(parsedContent);
        this.channel.ack(message);
      });
    } catch (err) {
      logging.info(err);
    }
  }
}

module.exports = new MessageBroker();

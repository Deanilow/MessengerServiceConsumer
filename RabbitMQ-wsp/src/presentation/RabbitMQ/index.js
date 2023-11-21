const amqp = require('amqplib');
const logging = require('../../common/logging');

class MessageBroker {
  constructor() {
    this.channel = null;
  }

  async connect() {
    logging.info('Connecting to RabbitMQ...');

    try {
      const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
      this.channel = await connection.createChannel();
      await this.channel.assertQueue('messagesPending');
      logging.info('RabbitMQ connected');
    } catch (err) {
      logging.error('Failed to connect to RabbitMQ:', err.message);
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

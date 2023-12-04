require('dotenv').config();
const consumerMessagesService = require('./presentation/RabbitMQ/consumer');
const { getPathFullNumberArrayActives } = require('./common/utils/helper');
const {
  dbConnectionString,
} = require('./configuration');
const signals = require('./signals');
const dbContainer = require('./data/infrastructure/db');
const messagesDetailRepositoryContainer = require('./data/repositories/messageDetailRepository');

const db = dbContainer.init(dbConnectionString);
const messagesDetailRepository = messagesDetailRepositoryContainer.init(db.schemas);

const messagesService = consumerMessagesService.init({
  messagesDetailRepository,
});
messagesService.setupMessageConsumer();

getPathFullNumberArrayActives().then((numbersActives) => {
  numbersActives.forEach((fullPathNumbersActives) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const module = require(fullPathNumbersActives);
    module.main();
  });
});

const shutdown = signals.init(async () => {
  await db.close();
});

(async () => {
  try {
    await db.connect();
  } catch (error) {
    await shutdown();
  }
})();

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

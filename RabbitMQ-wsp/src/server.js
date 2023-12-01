require('dotenv').config();
const fs = require('fs');
const path = require('path');
const consumerMessagesService = require('./presentation/RabbitMQ/consumer');
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

const folderPath = path.join(__dirname, './presentation/SessionsWsp');

fs.readdir(folderPath, async (error, fileNames) => {
  for (let i = 0; i < fileNames.length; i += 1) {
    const filePath = path.join(folderPath, fileNames[i]);
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const module = require(filePath);
    module.main();
  }
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

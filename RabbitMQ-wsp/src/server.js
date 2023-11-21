require('dotenv').config();
const consumerMessagesService = require('./presentation/RabbitMQ/consumer');
const {
  dbConnectionString,
} = require('./configuration');
const signals = require('./signals');
const dbContainer = require('./data/infrastructure/db');
const messagesDetailRepositoryContainer = require('./data/repositories/messageDetailRepository');
const { main } = require('./presentation/SessionsWsp/51900262844');

const db = dbContainer.init(dbConnectionString);
const messagesDetailRepository = messagesDetailRepositoryContainer.init(db.schemas);

const messagesService = consumerMessagesService.init({
  messagesDetailRepository,
});

messagesService.setupMessageConsumer();

main();

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

// require('dotenv').config();
// // const express = require('express');
// // const app = express();
// // const { main51917641085 } = require('./bot-whatsapp/bot.51917641085');
// const startConsumers = require('./config/rabbitMQ');

// // app.use(cors());
// // app.use(express.json());

// // main51917641085();

// startConsumers().catch((e) => console.error('Error al ejecutar el consumidor:', e));

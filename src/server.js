require('dotenv').config();
const consumerMessagesService = require('./presentation/RabbitMQ/consumer');
const { getPathFullNumberArrayActives } = require('./common/utils/helper');

const { sequelize} = require('./configuration/mssql');

const messagesDetailRepositoryContainer = require('./data/repositories/messageDetailRepository');

sequelize.authenticate().then(() => {
  console.log('Conexión a la base de datos exitosa');
}).catch((error) => {
  console.error('Error al conectar a la base de datos:', error);
});

sequelize.connectionManager.on('disconnect', () => {
  console.log('Desconexión detectada. Intentando reconectar...');
});

sequelize.connectionManager.on('reconnect', () => {
  console.log('Reconexión exitosa.');
});

const messagesDetailRepository = messagesDetailRepositoryContainer.init();

const messagesService = consumerMessagesService.init({
  messagesDetailRepository,
});

getPathFullNumberArrayActives().then((numbersActives) => {
  numbersActives.forEach((fullPathNumbersActives) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const module = require(fullPathNumbersActives);
    module.main();
  });
});

setTimeout(() => {
  messagesService.setupMessageConsumer();
}, 5000);

// process.on('SIGINT', shutdown);
// process.on('SIGTERM', shutdown);

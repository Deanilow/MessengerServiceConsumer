require('dotenv').config({ path: 'src/.env' });
// const cluster = require('cluster');
const {
  httpPort,
  dbConnectionString,
} = require('./configuration');

// const setupWorkerProcesses = require('./common/utils/workerProcesses');
const logging = require('./common/logging');
const signals = require('./signals');
const dbContainer = require('./data/infrastructure/db');

const authenticationRepositoryContainer = require('./data/repositories/authenticationRepository');
const postsRepositoryContainer = require('./data/repositories/posts');
const usersRepositoryContainer = require('./data/repositories/users');
const messagesRepositoryContainer = require('./data/repositories/messageRepository');
const messagesDetailRepositoryContainer = require('./data/repositories/messageDetailRepository');

const authServiceContainer = require('./domain/auth/service');
const postsServiceContainer = require('./domain/posts/service');
const usersServiceContainer = require('./domain/users/service');
const messagesServiceContainer = require('./domain/message/service');

const appContainer = require('./presentation/http');
// const websocketsContainer = require('./presentation/websockets');
const MessageBroker = require('./presentation/RabbitMQ');

const db = dbContainer.init(dbConnectionString);

const authenticationRepository = authenticationRepositoryContainer.init();
const postsRepository = postsRepositoryContainer.init(db.schemas);
const usersRepository = usersRepositoryContainer.init(db.schemas);
const messagesRepository = messagesRepositoryContainer.init(db.schemas);
const messagesDetailRepository = messagesDetailRepositoryContainer.init(db.schemas);

const authService = authServiceContainer.init({
  authenticationRepository,
  usersRepository,
});

const postsService = postsServiceContainer.init({
  postsRepository,
});

const usersService = usersServiceContainer.init({
  usersRepository,
  postsRepository,
});

const messagesService = messagesServiceContainer.init({
  messagesRepository,
  messagesDetailRepository,
});

const app = appContainer.init({
  authService,
  postsService,
  usersService,
  messagesService,
});

// websocketsContainer.init(app);
MessageBroker.connect();
// let server;

// ((isClusterRequired) => {
// if it is a master process then call setting up worker process
// if (isClusterRequired && cluster.isMaster) {
//   setupWorkerProcesses();
// } else {
// to setup server configurations and share port address for incoming requests
const server = app.listen(httpPort, () => {
  logging.info(`Listening on :${httpPort}`);
});
// }
// })(true);

const shutdown = signals.init(async () => {
  await db.close();
  await server.close();
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

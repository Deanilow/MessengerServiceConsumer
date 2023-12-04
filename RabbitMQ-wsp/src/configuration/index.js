require('dotenv').config();

const config = {
  dbConnectionString: process.env.DATABASE_URL,
  httpPort: process.env.HTTP_PORT || 8080,
  rabbitServer: process.env.RABBITMQ_SERVER,
  rabbitServiceWindows: process.env.DEFAULT_NAME_SERVICE_WINDOWS,
};

module.exports = config;

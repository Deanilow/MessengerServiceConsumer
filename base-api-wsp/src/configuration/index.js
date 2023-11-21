require('dotenv').config();

const config = {
  dbConnectionString: process.env.DATABASE_URL,
  httpPort: process.env.HTTP_PORT || 8080,
  jwtSecret: process.env.JWT_SECRET,
  rabbitServer: process.env.RABBITMQ_SERVER,
  // redis: {
  //   uri: process.env.REDIS_URL,
  // },
};


module.exports = config;

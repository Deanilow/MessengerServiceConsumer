const path = require('path');
const infoging = require('./common/logging');
const { getNumberArrayActives } = require('./common/utils/helper');
const config = require('./configuration');

getNumberArrayActives()
  .then((NumberArrayActives) => {
    const nameNumbersActives = NumberArrayActives.join('-');
    const nameService = `${config.nameService} from ${nameNumbersActives}`;
    const pathScriptExecute = path.join(__dirname, 'server.js');
    const svc = new Service({
      name: nameService,
      description: `RabbitMQ background service for sending messages for numbers : ${nameService}`,
      script: pathScriptExecute,
      nodeOptions: ['--harmony'],
    });

    svc.on('install', () => {
      svc.start();
    });

    svc.on('start', () => {
      infoging.info(`Service Windows ${nameService} Started`);
    });

    svc.on('error', (error) => {
      infoging.info(`Service Windows ${nameService} error: ${error})`);
    });

    svc.on('stop', () => {
      infoging.info(`Service Windows ${nameService} stopped`);
    });

    svc.install();
  })
  .catch((error) => {
    infoging.info(`Service Windows error install : ${error}`);
  });

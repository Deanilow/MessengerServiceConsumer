const { Service } = require('node-windows');
const path = require('path');
const infoging = require('./common/logging');
const { getNumberArrayActives } = require('./common/utils/helper');
const { nameService } = require('./configuration');

getNumberArrayActives()
  .then((NumberArrayActives) => {
    const nameNumbersActives = NumberArrayActives.join('-');
    const nameService = `${nameService} from ${nameNumbersActives}`;

    const pathScriptExecute = path.join(__dirname, 'server.js');
    const svc = new Service({
      name: nameService,
      description: `RabbitMQ background service for sending messages for numbers : ${nameService}`,
      script: pathScriptExecute,
      nodeOptions: ['--harmony'],
    });

    svc.on('uninstall', () => {
      infoging.info(`Service Windows ${nameService} uninstalled successfully`);
    });

    svc.uninstall();
  })
  .catch((error) => {
    infoging.info(`Service Windows error uninstall : ${error}`);
  });

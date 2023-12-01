const { Service } = require('node-windows');

const svc = new Service({
  name: 'SSSDEMO2',
  description: 'Descripción del Servicio',
});

svc.on('install', () => {
  svc.start();
});

svc.install();

/* eslint-disable import/no-unresolved */
const path = require('path');
const {
  createBot, createProvider, createFlow,
} = require('@bot-whatsapp/bot');

const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const infoging = require('../../common/logging');

const filename = __filename;

const numerBotName = path.basename(filename).split('.').shift();

const pathPublicQr = path.join(__dirname, '..', '..', 'storage', 'qrs');

const pathSession = path.join(__dirname, '..', '..', 'storage', 'sessions');

infoging.info(`Connect to number : ${numerBotName}`);

const adapterProvider = createProvider(BaileysProvider, {
  name: numerBotName,
  qrPath: pathPublicQr,
  sessionPath: pathSession,
});

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([]);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};
module.exports = {
  main,
  adapterProvider,
};

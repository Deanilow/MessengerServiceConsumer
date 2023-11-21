/* eslint-disable import/no-unresolved */
const path = require('path');
const {
  createBot, createProvider,
} = require('@bot-whatsapp/bot');

const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const QRPortalWeb = require('@bot-whatsapp/portal');
const infoging = require('../../common/logging');

const filename = __filename;

const numerBotName = path.basename(filename).split('.').shift();

const pathPublicQr = path.join(__dirname, '..', '..', 'storage', 'qrs');
const pathSession = path.join(__dirname, '..', '..', 'storage', 'sessions');
infoging.info(`Connect to number :${numerBotName}`);

const adapterProvider = createProvider(BaileysProvider, {
  name: numerBotName,
  qrPath: pathPublicQr,
  sessionPath: pathSession,
});

const main = async () => {
  const adapterDB = new MockAdapter();

  createBot({
    provider: adapterProvider,
    database: adapterDB,
  });

  // eslint-disable-next-line new-cap
  QRPortalWeb(
    {
      name: numerBotName,
      port: process.env.PORT_QR,
    },
  );
};
module.exports = {
  main,
  adapterProvider,
};

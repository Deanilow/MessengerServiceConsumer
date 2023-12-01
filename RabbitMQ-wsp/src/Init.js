require('dotenv').config();
const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, './presentation/SessionsWsp');

fs.readdir(folderPath, async (error, fileNames) => {
  for (let i = 0; i < fileNames.length; i += 1) {
    const filePath = path.join(folderPath, fileNames[i]);
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const module = require(filePath);
    module.main();
  }
});

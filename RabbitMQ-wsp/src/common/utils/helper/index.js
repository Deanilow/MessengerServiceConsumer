const fs = require('fs').promises;
const path = require('path');

const folderPath = path.join(__dirname, './../../../presentation/SessionsWsp');

function getRetryAfterSeconds(msBeforeNext) {
  return Math.round(msBeforeNext / 1000) || 1;
}

async function getNumberArrayActives() {
  const fileNames = await fs.readdir(folderPath);
  const namesWithoutExtension = fileNames.map(
    (fileName) => path.parse(fileName).name,
  );
  return namesWithoutExtension;
}

async function getPathFullNumberArrayActives() {
  const fileNames = await fs.readdir(folderPath);
  const namesWithoutExtension = fileNames.map((fileName) => path.join(folderPath, path.parse(fileName).name));
  return namesWithoutExtension;
}

module.exports = {
  getRetryAfterSeconds,
  getNumberArrayActives,
  getPathFullNumberArrayActives,
};

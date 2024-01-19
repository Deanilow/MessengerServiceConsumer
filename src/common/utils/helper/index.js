const fs = require('fs').promises;
const path = require('path');

const folderPathSessionsWsp = path.join(__dirname, './../../../presentation/SessionsWsp');
const filePathBlockedNumbers = path.join(__dirname, './../../../storage/common/blockedNumbers.json');

function getRetryAfterSeconds(msBeforeNext) {
  return Math.round(msBeforeNext / 1000) || 1;
}

async function getNumberArrayActives() {
  const fileNames = await fs.readdir(folderPathSessionsWsp);
  const namesWithoutExtension = fileNames.map(
    (fileName) => path.parse(fileName).name,
  );
  return namesWithoutExtension;
}

async function getPathFullNumberArrayActives() {
  const fileNames = await fs.readdir(folderPathSessionsWsp);
  const namesWithoutExtension = fileNames.map((fileName) => path.join(folderPathSessionsWsp, path.parse(fileName).name));
  return namesWithoutExtension;
}

async function getBlockedNumbers() {
  try {
    const data = await fs.readFile(filePathBlockedNumbers, 'utf8');
    const jsonData = JSON.parse(data);
    const numeroBloqueado = jsonData.numbers;
    return numeroBloqueado;
  } catch (error) {
    return "";
  }
}

async function setBlockedNumbers(nuevoNumeroBloqueado) {
  try {
    const jsonData = { numbers: nuevoNumeroBloqueado };
    await fs.writeFile(filePathBlockedNumbers, JSON.stringify(jsonData, null, 2), 'utf8');
  } catch (error) {
  }
}

module.exports = {
  setBlockedNumbers,
  getBlockedNumbers,
  getRetryAfterSeconds,
  getNumberArrayActives,
  getPathFullNumberArrayActives,
};

const { getPathFullNumberArrayActives } = require('./common/utils/helper');

getPathFullNumberArrayActives().then((numbersActives) => {
  numbersActives.forEach((fullPathNumbersActives) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const module = require(fullPathNumbersActives);
    module.main();
  });
});

const { getPathFullNumberArrayActives ,getBlockedNumbers, setBlockedNumbers } = require('./common/utils/helper');

getPathFullNumberArrayActives().then((numbersActives) => {
  numbersActives.forEach((fullPathNumbersActives) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const module = require(fullPathNumbersActives);
    module.main();
  });
});

// async function main() {

//   const jsonData = await getBlockedNumbers()
//   console.log(jsonData)

//   const jsonData2 = await setBlockedNumbers(`${jsonData};51919212223`)

//   const jsonData3= await getBlockedNumbers()
//   console.log(jsonData3 )

// } 

// main()
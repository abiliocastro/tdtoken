const { balances, mint, authorize, allowed_ifs, bind_key, check_key } = require('../src/services/TDServices.js');
const timeout = 60000;

// test('LizardBroker should have 250000 of initial TDTokens balance', async () => {
//   const lb = "LizardBroker";
//   // await mint(lb, 250000);
//   return balances(lb).then(data => {
//     expect(data).toBe(250000n);
//   });
// }, timeout);

// test('LizardBroker should be allowed to perform transactions', async () => {
//   const lb = "LizardBroker";
//   await authorize(lb);
//   return allowed_ifs(lb).then(result => {
//     expect(result).toBe(true);
//   });
// }, timeout);

test('LizardBroker should bind AbilioCastro key', async () => {
  const lb = "LizardBroker";
  const ac = "AbilioCastro";
  await bind_key(lb, ac);
  return check_key(lb, ac).then(result => {
    expect(result).toBe(true);
  });
}, timeout);
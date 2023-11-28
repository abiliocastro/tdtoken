const { balances, mint, authorize, allowed_ifs, bind_key, key_holder, send } = require('../src/services/TDServices.js');
const timeout = 60000;

// test('LizardBroker should have 250000 of initial TDTokens balance', async () => {
//   const lb = "LizardBroker";
//   await mint(lb, 250000);
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

// test('LizardBroker should bind AbilioCastro key', async () => {
//   const lb = "LizardBroker";
//   const ac = "AbilioCastro";
//   await bind_key(lb, ac);
//   return key_holder(ac).then(result => {
//     expect(result).toBe(lb);
//   });
// }, timeout);

test('LizardBroker should send 10000 TDTokens to AbilioCastro', async () => {
  const lb = "LizardBroker";
  const ac = "AbilioCastro";
  return send(lb, lb, ac, 10000n).then(() => {
    balances(ac).then((acBalance) => {
      return balances(lb).then(lbBalance => {
        expect(acBalance).toBe(70000n);
        expect(lbBalance).toBe(190000n);
      });
    });
  })
}, timeout);
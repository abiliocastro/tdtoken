const { balances, mint } = require('../src/services/TDServices.js');

test('LizardBroker should have 250000 of initial balance', async () => {
  const lb = "LizardBroker";
  await mint(lb, 250000);
  return balances(lb).then(data => {
    expect(data).toBe(250000n);
  });
}, 20000);
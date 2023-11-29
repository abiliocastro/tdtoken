import { balances, mint, authorize, allowed_ifs, bind_key, key_holder, send } from '../src/Service/TDServices.js';
const timeout = 60000;

// First: TD gives 250000 TDTokens for the LizardBroker
test('LizardBroker should have 250000 of initial TDTokens balance', async () => {
  const lb = "LizardBroker";
  await mint(lb, 250000);
  return balances(lb).then(data => {
    expect(data).toBe(250000n);
  });
}, timeout);

// Second:
test('LizardBroker should be allowed to perform transactions', async () => {
  const lb = "LizardBroker";
  await authorize(lb);
  return allowed_ifs(lb).then(result => {
    expect(result).toBe(true);
  });
}, timeout);

// Third:
test('LizardBroker should bind LizardBroker key', async () => {
  const lb = "LizardBroker";
  await bind_key(lb, lb);
  return key_holder(lb).then(result => {
    expect(result).toBe(lb);
  });
}, timeout);

// Fourth:
test('LizardBroker should send 10000 TDTokens to AbilioCastro', async () => {
  const lb = "LizardBroker";
  const ac = "AbilioCastro";
  await send(lb, lb, ac, 10000n);
  const acBalance = await balances(ac);
  const lbBalance = await balances(lb);
  expect(acBalance).toBe(10000n);
  expect(lbBalance).toBe(240000n);
}, timeout);
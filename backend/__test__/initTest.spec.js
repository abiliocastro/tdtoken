// TESTS FOR THE INITIAL SCENARIO WHEN A NEW CONTRACT IS DEPLOYED
import { balances, mint, authorize, allowed_ifs, bind_key, key_holder, send } from '../src/Service/TDServices.js';
import {KeyAlreadyBindedError } from '../src/Exceptions/KeyAlreadyBindedError.js';
const timeout = 60000;

const lb = "calangobank@calangobank.com";
const ac = "castro.abilio@gmail.com";
const ln = "leandrobeserra11@gmail.com";

// First: TD gives 250000 TDTokens for the CalangoBank
test('CalangoBank should have 250000 of initial TDTokens balance', async () => {
  await mint(lb, 250000);
  return balances(lb).then(data => {
    expect(data).toBe(250000n);
  });
}, timeout);

// Second:
test('CalangoBank should be allowed to perform transactions', async () => {
  await authorize(lb);
  return allowed_ifs(lb).then(result => {
    expect(result).toBe(true);
  });
}, timeout);

// Third:
test('CalangoBank should bind CalangoBank key', async () => {
  await bind_key(lb, lb);
  return key_holder(lb).then(result => {
    expect(result).toBe(lb);
  });
}, timeout);

// Fourth:
test('CalangoBank should send 10000 TDTokens to AbilioCastro', async () => {
  await send(lb, lb, ac, 10000n);
  const acBalance = await balances(ac);
  const lbBalance = await balances(lb);
  expect(acBalance).toBe(10000n);
  expect(lbBalance).toBe(240000n);
}, timeout);

// // Fifth:
test('Should thrown KeyAlreadyBindedError', async () => {
  await expect(bind_key(lb, lb))
  .rejects
  .toThrow(KeyAlreadyBindedError)
}, timeout);

// Sexto:
test('CalangoBank should bind AbilioCastro key', async () => {
  await bind_key(lb, ac);
  return key_holder(ac).then(result => {
    expect(result).toBe(lb);
  });
}, timeout);

// Setimo:
test('CalangoBank should bind LeandroBeserra key', async () => {
  await bind_key(lb, ln);
  return key_holder(ln).then(result => {
    expect(result).toBe(lb);
  });
}, timeout);
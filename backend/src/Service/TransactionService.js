import { send } from "./TDServices.js";
import { findUserRealBalance } from "../Repository/UserRepository.js";
import { NotEnougRealFounds } from "../Exceptions/NotEnougRealFounds.js";
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const calangoBankKey = process.env.CALANGO_BANK_KEY;

async function sendTransaction(sender, receiver, amount) {
  try {
    await send(calangoBankKey, sender, receiver, amount);  
  } catch (error) {
    throw error;
  }
}

async function buyTokens(receiver, amount) {
  try {
    const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=DOGE');
    const dogeInfo = await response.json();
    const currentPrice = parseFloat(dogeInfo.data.rates.BRL);
    const realValue = amount * currentPrice;
    const userAvailableBalance = await findUserRealBalance(receiver);
    if(userAvailableBalance >= realValue) {
      await send(calangoBankKey, calangoBankKey, receiver, amount);
      // Decrease valor em reais
    } else {
      throw new NotEnougRealFounds(`User ${receiver} not have enough real founds | requested: ${realValue} available: ${userAvailableBalance}`)
    }    
  } catch (error) {
    throw error;
  }
}

export { sendTransaction, buyTokens };


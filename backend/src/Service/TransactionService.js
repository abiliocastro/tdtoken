import { send } from "./TDServices.js";

async function sendTransaction(sender, receiver, amount) {
  try {
    await send('calangobank@calangobank.com', sender, receiver, amount);  
  } catch (error) {
    throw error;
  }
}

export default sendTransaction;


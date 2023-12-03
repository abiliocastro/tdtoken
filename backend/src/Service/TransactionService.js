import { send } from "./TDServices";

async function sendTransaction(sender, receiver, amount) {
  send('calangobank@calangobank.com', sender, receiver, amount);
}

export default sendTransaction;


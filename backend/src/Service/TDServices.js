import { Web3 } from 'web3'; //  web3.js has native ESM builds and (`import Web3 from 'web3'`)
import { connectToEthereum, getContract } from "../Configuration/ConnectWeb3.js"
import dotenv from 'dotenv';
dotenv.config();

// Set up a connection to the Ethereum network
const web3 = connectToEthereum();

const myContract = getContract();

// Creating a signing account from a private key
const signer = web3.eth.accounts.privateKeyToAccount(
    '0x' + process.env.SIGNER_PRIVATE_KEY,
);

// Support functions
function getTxForMethod(method_abi) {
    return {
        from: signer.address,
        to: myContract.options.address,
        data: method_abi,
        value: '0',
        gasPrice: '100000000000',
    }
}

async function estimateTxGas(tx, method) {
    return web3.eth.estimateGas(tx).then((gas_estimate) => {
        // console.log(`Estimated ${method} tx gas usage: ` + gas_estimate);
        return gas_estimate;
    });
}

async function sendMethodTransaction(method_abi, method_name) {
    const tx = getTxForMethod(method_abi)
    tx.gas = await estimateTxGas(tx, method_name)
    
    const signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey);
    console.log("Raw transaction data: " + (signedTx).rawTransaction);
    
    // Sending the transaction to the network
    web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .then((receipt) => {
            console.log(`Transaction mined!`);
            console.log(`https://sepolia.etherscan.io/tx/${receipt.transactionHash}`);
            console.log(`Mined in block ${receipt.blockNumber}`);
        });
}

// Contract methods
async function mint(key, value) {
	try {
        const method_abi = myContract.methods.mint(key, value).encodeABI();
        await sendMethodTransaction(method_abi, "mint");
	} catch (error) {
		console.error(error);
	}
}

async function balances(key) {
    const balance = await myContract.methods.balances(key).call();
    console.log(`${key} balance: ` + balance);
    return balance;
}

async function authorize(financial_institution) {
	try {
        const method_abi = myContract.methods.authorize(financial_institution).encodeABI();
        await sendMethodTransaction(method_abi, "authorize");
	} catch (error) {
		console.error(error);
	}
}

async function allowed_ifs(financial_institution) {
    const result = await myContract.methods.allowed_ifs(financial_institution).call();
	console.log(`${financial_institution} is allowed: ` + result);
    return result;
}

async function bind_key(financial_institution, key) {
	try {
        const method_abi = myContract.methods.bind_key(financial_institution, key).encodeABI();
        sendMethodTransaction(method_abi, "bind_key")
	} catch (error) {
        decodedError = web3.eth.abi.decodeParameter('string', error.data);
        console.log("Error: " + decodedError);
	}
}

async function key_holder(key) {
	return await myContract.methods.key_holder(key).call();
}

async function send(financial_institution, sender, receiver, amount) {
	try {
        const method_abi = myContract.methods.send(financial_institution, sender, receiver, amount).encodeABI();
        sendMethodTransaction(method_abi, "send")
	} catch (error) {
		decodedError = web3.eth.abi.decodeParameter('string', error.data);
        console.log("Error: " + decodedError);
	}
}

export { mint, balances, authorize, allowed_ifs, bind_key, key_holder, send };
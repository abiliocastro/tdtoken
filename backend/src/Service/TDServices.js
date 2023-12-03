import { Web3 } from 'web3'; //  web3.js has native ESM builds and (`import Web3 from 'web3'`)
import { ethers } from 'ethers';
import { Eip838ExecutionError } from 'web3';
import { decodeContractErrorData } from 'web3-eth-abi';
import { connectToEthereum, getContract } from  '../Configuration/ConnectWeb3.js';
import { KeyAlreadyBindedError } from '../Exceptions/KeyAlreadyBindedError.js';
import { NotKeyHolderError } from '../Exceptions/NotKeyHolderError.js';
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
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .then((receipt) => {
            console.log(`Transaction mined!`);
            console.log(`https://sepolia.etherscan.io/tx/${receipt.transactionHash}`);
            console.log(`Mined in block ${receipt.blockNumber}`);
        });
}

// Error handle
function parseInnerError(e, contract) {
  if (e?.innerError?.errorSignature) {
    return e.innerError;
  }

  if (!e.innerError) {
    if (e?.data?.data.startsWith('0x')) {
      e.innerError = new Eip838ExecutionError(e.data);
    }
  }
  if (e?.innerError?.data?.startsWith('0x')) {
    decodeContractErrorData(contract._errorsInterface, e.innerError);
  }
  return e.innerError;
}

function bindKeyErrorHandle(error, contract) {
    const innerError = parseInnerError(error, contract);
    if (innerError.errorName === 'KeyAlreadyBinded') {
        const errorMessage = `Financial institution: ${innerError.errorArgs[0]} cannot bind key: ${innerError.errorArgs[1]} because it is already binded!`;
        console.log(errorMessage);
        throw new KeyAlreadyBindedError(errorMessage);
    } else {
        console.log("Unknown error:", error);
        throw error;
    }
}

function sendErrorHandle(error, contract) {
    const innerError = parseInnerError(error, contract);
    if (innerError.errorName === 'InsufficientBalance') {
        console.log(`InsufficientBalance meu chapa!`);
        throw innerError;
    }
    else if(innerError.errorName === 'NotKeyHolder') {
        const errorMessage = `Financial institution: ${innerError.errorArgs[0]} is not keyholder of key: ${innerError.errorArgs[1]}!`;
        console.log(errorMessage);
        throw new NotKeyHolderError(errorMessage);
    } 
    else {
        console.log("Unknown error:", error);
        throw innerError;
    }
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
        await sendMethodTransaction(method_abi, "bind_key")
	} catch (error) {
        bindKeyErrorHandle(error, myContract);
	}
}

async function key_holder(key) {
	return await myContract.methods.key_holder(key).call();
}

async function send(financial_institution, sender, receiver, amount) {
	try {
        const method_abi = myContract.methods.send(financial_institution, sender, receiver, amount).encodeABI();
        await sendMethodTransaction(method_abi, "send")
	} catch (error) {
        sendErrorHandle(error, myContract);
	}
}

export { mint, balances, authorize, allowed_ifs, bind_key, key_holder, send };
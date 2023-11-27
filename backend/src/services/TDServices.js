const { Web3 } = require('web3'); //  web3.js has native ESM builds and (`import Web3 from 'web3'`)
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Set up a connection to the Ethereum network
const web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/d74d2369730944b38ae9ff5da6d8b654'));

// Read the contract address from the file system
const deployedAddressPath = path.join(__dirname, "..", "..", "contract", 'TDTokenAddress.bin');
const deployedAddress = fs.readFileSync(deployedAddressPath, 'utf8');

console.log("Interact with contract address: " + deployedAddress);

// Create a new contract object using the ABI and bytecode
const abi = require('../../contract/TDTokenAbi.json');
const myContract = new web3.eth.Contract(abi, deployedAddress);
myContract.handleRevert = true;

// Creating a signing account from a private key
const signer = web3.eth.accounts.privateKeyToAccount(
    '0x' + process.env.SIGNER_PRIVATE_KEY,
);

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
    const gas_estimate = await web3.eth.estimateGas(tx);
    console.log(`Estimated ${method} tx gas usage: ` + gas_estimate);
    return gas_estimate;
}

async function mint(key, value) {
	try {
        const method_abi = myContract.methods.mint(key, value).encodeABI();
        
        const tx = getTxForMethod(method_abi)
        tx.gas = estimateTxGas(tx, "mint")
        
        const signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey);
        console.log("Raw transaction data: " + (signedTx).rawTransaction);
      
        // Sending the transaction to the network
        const receipt = await web3.eth
            .sendSignedTransaction(signedTx.rawTransaction)
            .once("transactionHash", (txhash) => {
            console.log(`Mining transaction ...`);
            console.log(`https://sepolia.etherscan.io/tx/${txhash}`);
            });
        // The transaction is now on chain!
        console.log(`Mined in block ${receipt.blockNumber}`);
	} catch (error) {
		console.error(error);
	}
}

async function authorize(financial_institution) {
	try {
        const method_abi = myContract.methods.authorize(financial_institution).encodeABI();
        
        const tx = getTxForMethod(method_abi)
        tx.gas = estimateTxGas(tx, "authorize")
        
        const signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey);
        console.log("Raw transaction data: " + (signedTx).rawTransaction);
      
        // Sending the transaction to the network
        const receipt = await web3.eth
            .sendSignedTransaction(signedTx.rawTransaction)
            .once("transactionHash", (txhash) => {
            console.log(`Mining transaction ...`);
            console.log(`https://sepolia.etherscan.io/tx/${txhash}`);
            });
        // The transaction is now on chain!
        console.log(`Mined in block ${receipt.blockNumber}`);
	} catch (error) {
		console.error(error);
	}
}

async function balances(key) {
    const balance = await myContract.methods.balances(key).call();
	console.log(`${key} balance: ` + balance);
    return balance;
}

authorize("LizardBroker");
balances("LizardBroker");
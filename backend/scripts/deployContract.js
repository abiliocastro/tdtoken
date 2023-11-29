// For simplicity we use `web3` package here. However, if you are concerned with the size,
//	you may import individual packages like 'web3-eth', 'web3-eth-contract' and 'web3-providers-http'.
import { Web3 } from 'web3'; //  web3.js has native ESM builds and (`import Web3 from 'web3'`)
import fs from 'fs';
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 

// Set up a connection to the Ethereum network
const web3 = new Web3(new Web3.providers.HttpProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`));
web3.eth.Contract.handleRevert = true;

async function deploy() {
    // Read the bytecode from the file system
    const bytecodePath = path.join(__dirname, "..", "contract", 'TDTokenBytecode.bin');
    const bytecode = fs.readFileSync(bytecodePath, 'utf8');

    // Create a new contract object using the ABI and 
    const abiPathFile = path.join(__dirname, '..', 'contract', 'TDTokenAbi.json');
    const abi = JSON.parse(fs.readFileSync(abiPathFile, 'utf-8'))

    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(
        '0x' + process.env.SIGNER_PRIVATE_KEY,
    );

    web3.eth.accounts.wallet.add(signer);

	try {
		// Using the signing account to deploy the contract
        const contract = new web3.eth.Contract(abi);
        contract.options.data = bytecode;
        const deployTx = contract.deploy();

        const estimated = await deployTx.estimateGas();
        console.log("Estimated gas to deploy contract: " + estimated);

        const deployedContract = await deployTx
            .send({
            from: signer.address,
            gas: await deployTx.estimateGas(),
            gasLimit: 10000000
            })
            .once("transactionHash", (txhash) => {
            console.log(`Mining deployment transaction ...`);
            console.log(`https://sepolia.etherscan.io/tx/${txhash}`);
            });
        // The contract is now deployed on chain!
        console.log(`Contract deployed at ${deployedContract.options.address}`);

		// Write the Contract address to a new file
		const deployedAddressPath = path.join(__dirname, "..", "contract", 'TDTokenAddress.bin');
		fs.writeFileSync(deployedAddressPath, deployedContract.options.address);
	 } catch (error) {
		console.error(error);
	} 
}

deploy();
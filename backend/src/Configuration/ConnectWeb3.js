import Web3 from "web3" 
import fs from 'fs'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

// Set up a connection to the Ethereum network
export function connectToEthereum(){
    return new Web3(new Web3.providers.HttpProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`));
}

// Select contract to interact
export function getContract(){
    const web3 = connectToEthereum();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);  

    let abiPathFile = path.join(__dirname, '..', '..', 'contract', 'TDTokenAbi.json');
    let abi = JSON.parse(fs.readFileSync(abiPathFile, 'utf-8'))

    const deployedAddressPath = path.join(__dirname, "..", "..", "contract", 'TDTokenAddress.bin');
    const deployedAddress = fs.readFileSync(deployedAddressPath, 'utf8');

    const myContract = new web3.eth.Contract(abi, deployedAddress);
    myContract.handleRevert = true;

    return myContract;
}
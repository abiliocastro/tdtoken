import { getContract } from "../Configuration/ConnectWeb3.js"
import BigNumber from 'bignumber.js'

export class GetBallanceService{
    async execute(walletHash){
        let contract = getContract(null, "0xDE6B1BD4C4D132731eee5865D079bE8a06341942");

        try {
            let balance = await contract.methods.balances(walletHash).call();
            return new BigNumber(balance)
        } catch (error) {
            return new Error(error)
        }

    }
}
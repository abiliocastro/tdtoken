import { balances } from "./TDServices.js"
import BigNumber from 'bignumber.js'

export class GetBalanceService{
    async execute(key){
        try {
            let balance = await balances(key);
            return new BigNumber(balance)
        } catch (error) {
            return new Error(error)
        }
    }
}
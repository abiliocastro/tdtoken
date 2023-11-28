import { connectToEthereum } from "../Configuration/ConnectWeb3.js"

export class CreateAccountService{
    async handle(request, response){
        let web3 = connectToEthereum()

        // Salva as informações no banco de dados

        let account = web3.eth.accounts.create(web3.utils.randomHex(32));
        let wallet = web3.eth.accounts.wallet.add(account);
        let keystore = wallet.encrypt(web3.utils.randomHex(32));

        // Atualiza no banco com a wallet criada

        return response.status(200).json({
            'message': "Wallet created with success",
            'account': account,
            'wallet': wallet,
            'keystore': keystore
        })
    }
}
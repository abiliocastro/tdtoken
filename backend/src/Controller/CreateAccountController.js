import { CreateAccountService } from "../Service/CreateAccountService.js"

export class CreateAccountController{
    async handle(request, response){
        // Valida as informações do usuário
        // CPF, nome....

        const createAccountService = new CreateAccountService()
        createAccountService.handle(request, response)
    }
}
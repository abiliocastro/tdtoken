import { GetBalanceService } from "../Service/GetBalanceService.js";

export class GetBalanceController {
    async handle(request, response){
        const { key } = request.params
        if(!key){
            return response.status(400).json({
                'message': "The user key is mandatory"
            })
        }
        if(request.session.user.email != key) {
            return response.status(400).json({
                "message": "User not allowed to perform transaction from another account! :||",
              });  
        }
        
        const getBalanceService = new GetBalanceService()
        const result = await getBalanceService.execute(key)

        if(result instanceof Error) {
            return response.status(400).json({
                "error": result.message
            })
        }else{
            return response.status(200).json({
                "balance": result
            })
        }
    }
}
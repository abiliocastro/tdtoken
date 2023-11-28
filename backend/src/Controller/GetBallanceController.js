import { GetBallanceService } from "../Service/GetBallanceService.js";

export class GetBallanceController{
    async handle(request, response){
        const { walletHash } = request.params

        if(!walletHash){
            return response.status(400).json({
                'message': "The Wallet Hash is mandatory"
            })
        }

        const getBallanceService = new GetBallanceService()
        const result = await getBallanceService.execute(walletHash)

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
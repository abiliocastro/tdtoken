import sendTransaction from "../Service/TransactionService";

export class TransactionController {
  async handle(request, response){
    try {
      if(request.body.sender && request.body.receiver && request.body.amount) {
        sendTransaction(request.body.sender, request.body.receiver, request.body.amount)
        .then(() => {
          return response.status(200);  
        })  
      } else {
        return response.status(400).json({
          "message": "Please send all transaction fields",
        });   
      }
    } catch (error) {
      return response.status(400).json({
        "message": "Error when sending transaction!",
        "error": error.message
      })   
    }
}  
}
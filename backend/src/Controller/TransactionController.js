import sendTransaction from "../Service/TransactionService.js";

export class TransactionController {
  async handle(request, response){
  
    if(request.body.sender && request.body.receiver && request.body.amount) {
      if(request.session.user.email == request.body.sender) {
        try {
          await sendTransaction(request.body.sender, request.body.receiver, request.body.amount);
          return response.status(200).send();  
        } catch (error) {
          return response.status(400).json({
            "message": "Error when sending transaction!",
            "error": error.message
          })   
        } 
      } else {
        return response.status(400).json({
          "message": "User not allowed to perform transaction from another account! :||",
        });  
      }
    } else {
      return response.status(400).json({
        "message": "Please send all transaction fields",
      });   
    }
}  
}
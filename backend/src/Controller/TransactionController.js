import { sendTransaction, buyTokens } from "../Service/TransactionService.js";

export class TransactionController {
  async handleSendTransaction(request, response){
    if(request.body.sender && request.body.receiver && request.body.amount) {
      if(request.session.user.email == request.body.sender) {
        try {
          await sendTransaction(request.body.sender, request.body.receiver, request.body.amount);
          return response.status(200).send();  
        } catch (error) {
          return response.status(400).json({
            "message": "Error when sending transaction!",
            "error": error
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
  
  async handleBuyTokens(request, response){ 
    if(request.body.amount && request.body.amount > 0 && request.session.user.email) {
      try {
        await buyTokens(request.session.user.email, request.body.amount);
        return response.status(200).send();  
      } catch (error) {
        return response.status(400).json({
          "message": "Error when sending transaction!",
          "error": error.message
        })     
      }
    }
    return response.status(400).json({
      "message": "Invalid amount",
    }) 
  }
}
import sendMessage from "../Service/ChatService.js"

export class ChatController{
    async handle(request, response){
        try {
          const result = await sendMessage(request.body.message);
          return response.status(200).json(result);  
        } catch (error) {
          return response.status(400).json({
            "message": "Error in chat interaction!",
            "error": error.message
          })   
        }
    }
}
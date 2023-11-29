import saveUser from "../Service/UserService.js";

export class UserController {
  async handleUser(request, response) {
    try {
      const result = await saveUser(request.body) 
      return response.status(200).json({
        "userId": result
      })
    } catch (error) {
      return response.status(400).json({
        "message": "Error creating user!",
        "error": error
      })  
    }
  }
}
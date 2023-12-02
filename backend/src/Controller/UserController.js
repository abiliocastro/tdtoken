import { saveUser, searchByUser, searchByEmail } from "../Service/UserService.js";

export class UserController {
  async handleUser(request, response) {
    try {
      const result = await saveUser(request.body);
      return response.status(200).json({
        "userId": result
      });
    } catch (error) {
      return response.status(400).json({
        "message": "Error creating user!",
        "error": error
      });  
    }
  }

  async getUser(request, response) {
    try {
      const result = await searchByUser(request.body);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({
        "message": "Error searching user!",
        "error": error
      })  
    }
  }

  async login(request, response) {
    try {
      const user = await searchByEmail(request.body.email);
      if(user){
        if(user.password === request.body.password) {
          return response.status(200).json({
            "message": "success"
          });
        } else {
          return response.status(403).json({
            "message": "invalid user or email"
          });
        } 
      }
      return response.status(401).json({ // I don't know you!
        "message": "invalid user or email"
      });
    } catch (error) {
      return response.status(400).json({
        "message": "Error when try to login!",
        "error": error
      })  
    }
  }
}
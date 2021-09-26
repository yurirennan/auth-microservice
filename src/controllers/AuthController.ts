import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { AuthError } from "../errors/AuthError";

import UsersRepository from "../repositories/UsersRepository";

const usersRepository = new UsersRepository();

class AuthController {
  async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {

    if(!request.user) {
      throw new AuthError("Athentication Error", 401);
    }
    
    const { id, username } = request.user;

    //playload, secret, options
    const jwtToken = jwt.sign({
      user_username: username,
    }, 'd0ceeeeb5db4d037b98549b729b4fd42', {
      subject: id,
    })

    return response.json({ token: jwtToken});
  }
}

export default AuthController;
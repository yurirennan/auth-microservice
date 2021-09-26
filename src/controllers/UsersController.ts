import { Request, Response } from "express";

import UsersRepository from "../repositories/UsersRepository";

const usersRepository = new UsersRepository();

class UsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const users = await usersRepository.findAllUsers();

    return response.status(200).json(users);
  }

  async findUserById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    
    const user = await usersRepository.findUserById(id);
  
    return response.status(200).json(user);  
  }

  async saveUser(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;
    
    const user = await usersRepository.createUser(username, password);
  
    return response.status(200).json(user);  
  }

  async updateUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { username, password } = request.body;
    
    const user = await usersRepository.updateUser(id, username, password);
  
    return response.status(200).json(user);  
  }

  async deleteUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await usersRepository.deleteUser(id);

    return response.status(200).send();
  }
}

export default UsersController;
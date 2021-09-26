import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

import { AuthError } from "../errors/AuthError";

import UsersRepository from "../repositories/UsersRepository";

const usersRepository = new UsersRepository();

export async function BearerAuth(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if(!authorization) {
    throw new AuthError("Athentication Error");
  }

  const [ authType, token] = authorization.split(' ');

  if (authType !== "Bearer" || !token) {
    throw new AuthError("Athentication Error");
  }

  const tokenPayload = jwt.verify(token, 'd0ceeeeb5db4d037b98549b729b4fd42');

  if(typeof tokenPayload !== 'object' || !tokenPayload.sub) {
    throw new AuthError("Athentication Error");
  }

  const user_id = tokenPayload.sub;

  const user = await usersRepository.findUserById(user_id);

  request.user = user;

  next();
}
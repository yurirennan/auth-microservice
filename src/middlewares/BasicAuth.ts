import { NextFunction, Request, Response } from "express";

import UsersRepository from "../repositories/UsersRepository";

import { AuthError } from "../errors/AuthError";

const usersRepository = new UsersRepository();

export async function BasicAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AuthError("Athentication Error", 401);
  }

  const [authType, token] = authorization.split(" ");

  if (authType !== "Basic" || !token) {
    throw new AuthError("Athentication Error", 401);
  }

  //converter base64 para string
  const tokenContent = Buffer.from(token, "base64").toString("utf-8");

  const [username, password] = tokenContent.split(":");

  if (!username || !password) {
    throw new AuthError("Athentication Error", 401);
  }

  const user = await usersRepository.findUserByUsernameAndPassword(
    username,
    password
  );

  if (!user) {
    throw new AuthError("Athentication Error", 401);
  }

  request.user = user;

  next();
}

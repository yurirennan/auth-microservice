import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { AuthError } from "../errors/AuthError";

export function ErrorHandler(err: Error, request: Request, response: Response, next: NextFunction){
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  } else if(err instanceof AuthError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  };

  return response.status(500).json({
    statusCode: 500,
    message: `Internal Server Error - ${err.message}`
  })
}
import { Router } from "express";

import { BasicAuth } from "../middlewares/BasicAuth";

import AuthController from '../controllers/AuthController';
import { JwtAuth } from "../middlewares/JwtAuth";


const authController = new AuthController();

const authorizationRoutes = Router();

authorizationRoutes.post('/token', BasicAuth, authController.handle);
authorizationRoutes.post('/token/validate', JwtAuth, authController.handleVerifyToken)

export default authorizationRoutes;
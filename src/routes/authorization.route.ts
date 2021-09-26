import { Router } from "express";

import { BasicAuth } from "../middlewares/BasicAuth";

import AuthController from '../controllers/AuthController';


const authController = new AuthController();

const authorizationRoutes = Router();

authorizationRoutes.post('/token', BasicAuth, authController.handle);

export default authorizationRoutes;
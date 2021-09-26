import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const routes = Router();

const usersController = new UsersController();

routes.get('/users', usersController.handle);

routes.get('/users/:id', usersController.findUserById);

routes.post('/users', usersController.saveUser);

routes.put('/users/:id', usersController.updateUser);

routes.delete('/users/:id', usersController.deleteUser);


export default routes;
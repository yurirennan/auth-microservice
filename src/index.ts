import express from 'express';
import 'express-async-errors';

import { ErrorHandler } from './middlewares/ErrorHandler';

import statusRoutes from './routes/status.route';
import usersRoutes from './routes/users.route';
import authorizationRoutes from './routes/authorization.route';

const app = express();

const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded( { extended: true }));

app.use(statusRoutes);
app.use(usersRoutes);
app.use(authorizationRoutes);
app.use(ErrorHandler)

app.listen(PORT, () => {
  console.log('Server is running....');
});
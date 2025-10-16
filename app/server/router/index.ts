import { Router } from 'express';
import homeRouter from './home.routes';

const mainRouter = Router();

// Mount the routers for specific paths
mainRouter.use('/', homeRouter);
// Future routes can be added here, e.g.:
// mainRouter.use('/users', usersRouter);

export default mainRouter;
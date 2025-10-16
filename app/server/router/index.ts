import { Router } from 'express';
import homeRouter from './home.routes';
import postRouter from './post.routes';

const mainRouter = Router();

// Mount the routers for specific paths
mainRouter.use('/', homeRouter);
mainRouter.use('/api/posts', postRouter);

export default mainRouter;
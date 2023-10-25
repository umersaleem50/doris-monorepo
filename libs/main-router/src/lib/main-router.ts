import { Router } from 'express';
import { userRouter } from '@org/routes';
export const mainRouter = Router();

mainRouter.use('/auth', userRouter);

mainRouter.get('/test', (req, res) => {
  return res.json({ message: 'getting from api...' });
});

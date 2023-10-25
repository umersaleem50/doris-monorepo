import { Router } from 'express';
import productRouter from './Routes/productRoute';
import reviewRouter from './Routes/reviewRoute';
import userRouter from './Routes/userRoute';
const mainRouter = Router();
mainRouter.use('/products', productRouter);
mainRouter.use('/users', userRouter);
mainRouter.use('/reviews', reviewRouter);

export default mainRouter;

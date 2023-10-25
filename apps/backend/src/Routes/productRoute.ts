import express from 'express';
import {
  createProduct,
  deleteOne,
  getAllProducts,
  getProduct,
  getProductName,
  updateOne,
} from '../Controllers/productController';
import * as authController from '../Controllers/authController';
import * as imagesController from '../Controllers/imagesController';
import reviewRouter from './reviewRoute';
const productRouter = express.Router();

productRouter.use('/:productId/reviews', reviewRouter);
productRouter.route('/').get(getAllProducts);
productRouter.route('/:id').get(getProduct);

productRouter.use(authController.protectedRoute);

productRouter.use(authController.restrictedTo('admin', 'developer'));

productRouter
  .route('/')
  .post(
    imagesController.uploadImages,
    imagesController.resizeImages,
    createProduct
  );

productRouter
  .route('/:id')
  .patch(
    getProductName,
    imagesController.uploadImages,
    imagesController.resizeImages,
    updateOne
  )
  .delete(deleteOne);

export default productRouter;

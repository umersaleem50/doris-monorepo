import express = require('express');
import productController = require('../Controllers/productController');
import authController = require('../Controllers/authController');
import imagesController = require('../Controllers/imagesController');
import reviewRouter = require('./review.routes');
const Router = express.Router();

Router.use('/:productId/reviews', reviewRouter);
// Router.use(authController.protected);
Router.route('/').get(productController.getAllProducts);

Router.route('/:id').get(productController.getProduct);

Router.use(authController.restrictedTo('admin', 'developer'));

Router.route('/').post(
  imagesController.uploadImages,
  imagesController.resizeImages,
  productController.createProduct
);

Router.route('/:id')
  .patch(
    productController.getProductName,
    imagesController.uploadImages,
    imagesController.resizeImages,
    productController.updateOne
  )
  .delete(productController.deleteOne);

module.exports = Router;

import { Router } from 'express';
import * as reviewController from '../Controllers/reviewsController';
import * as authController from '../Controllers/authController';

const reviewRouter = Router({ mergeParams: true });

reviewRouter.use(authController.protectedRoute);

reviewRouter
  .route('/')
  .get(reviewController.getAllReviews)
  .post(reviewController.getProductIdUserId, reviewController.createReview);

reviewRouter
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

export default reviewRouter;

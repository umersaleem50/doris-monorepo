import { Review } from '@org/db-models';
import {
  getAllDocuments,
  createDocument,
  deleteOneDocument,
  getDocument,
  updateOneDocument,
} from './handlerFactory';

export const getProductIdUserId = (req, res, next) => {
  if (req.user) req.body.user = req.user.id;
  if (req.params.productId) req.body.product = req.params.productId;
  next();
};

export const getAllReviews = getAllDocuments(Review);
export const getReview = getDocument(Review, {});
export const createReview = createDocument(Review, {});
export const updateReview = updateOneDocument(Review);
export const deleteReview = deleteOneDocument(Review);

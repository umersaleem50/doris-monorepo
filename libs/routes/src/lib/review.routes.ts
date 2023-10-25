const express = require("express");
const reviewController = require("../Controllers/reviewsController");
const authController = require("../Controllers/authController");

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.use(authController.protected);

reviewRouter.route("/")
  .get(reviewController.getAllReviews)
  .post(reviewController.getProductIdUserId, reviewController.createReview);

reviewRouter.route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = reviewRouter;

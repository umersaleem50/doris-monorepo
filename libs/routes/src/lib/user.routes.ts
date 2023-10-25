import express = require('express');
import {
  protectedRoute,
  signUp,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
  updateProfile,
  getCurrentUser,
  deactivateAccount,
} from '@org/controllers';
// import imagesController = require("../Controllers/imagesController");

export const userRouter = express.Router();

userRouter.get('/getCurrentUser', protectedRoute, getCurrentUser);

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.post('/forgetPassword', forgetPassword);

userRouter.post('/resetPassword/:token', resetPassword);
// userRouter.route('/api/v1/')

userRouter.post('/changePassword', protectedRoute, changePassword);

userRouter.patch(
  '/updateProfile',
  protectedRoute,
  // imagesController.uploadSingleImage,
  // imagesController.resizeSingleImage,
  updateProfile
);

userRouter.post('/deactivateAccount', protectedRoute, deactivateAccount);

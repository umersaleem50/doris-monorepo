import express from 'express';
import * as authController from '../Controllers/authController';
import * as imagesController from '../Controllers/imagesController';

const userRouter = express.Router();

userRouter.get(
  '/getCurrentUser',
  authController.protectedRoute,
  authController.getCurrentUser
);

userRouter.post('/signup', authController.signUp);
userRouter.post('/login', authController.login);
userRouter.post('/forgetPassword', authController.forgetPassword);

userRouter.post('/resetPassword/:token', authController.resetPassword);
// userRouter.route('/api/v1/')

userRouter.post(
  '/changePassword',
  authController.protectedRoute,
  authController.changePassword
);

userRouter.patch(
  '/updateProfile',
  authController.protectedRoute,
  imagesController.uploadSingleImage,
  imagesController.resizeSingleImage,
  authController.updateProfile
);

userRouter.post(
  '/deactivateAccount',
  authController.protectedRoute,
  authController.deactivateAccount
);

export default userRouter;

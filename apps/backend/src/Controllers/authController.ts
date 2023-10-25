import { User } from '@org/db-models';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { promisify } from 'util';
import { sendMail } from '../utilities/sendMail';

import catchAsync from '../utilities/catchAsync';
import ApiError from '../utilities/apiError';
import { filterFields } from '../utilities/utilties';

const sendTokenRes = (res, status, data) => {
  return res.status(status).json({ status: 'success', data });
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};

export const signUp = catchAsync(async (req, res, next) => {
  //Make user
  const user = await User.create(req.body);
  //Give jwt Token
  const token = createToken(user._id);

  //Send Response
  sendTokenRes(res, 201, { token, data: user });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ApiError('Please enter email & password.', 401));

  const user = await User.findOne({ email }).select('+password');
  if (!user) return next(new ApiError('No user exist with this email.', 404));

  if (!(await user.correctPassword(password, user.password)))
    return next(new ApiError('Invalid email or password', 401));

  //Hide encryped password in request
  user.password = undefined;

  const token = createToken(user._id);

  sendTokenRes(res, 200, { token, data: user });
});

export const protectedRoute = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.header('authorization') &&
    req.header('authorization').startsWith('Bearer')
  )
    token = req.header('authorization').split(' ')[1];

  if (!token)
    return next(new ApiError('Please login first to use this route.', 401));

  //CHECKS IF THE TOKEN IS VALID OR AND NOT EXPIRED, RETURNS PAYLOAD
  const decodeToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRETKEY
  );

  const user = await User.findById({ _id: decodeToken.id }).select(
    '+passwordChangedAt'
  );

  //IF NO USER EXIST OR DEACTIVATED THE ACCOUNT.
  if (!user) return next(new ApiError('No user exist.', 404));

  //IF USER CHANGED PASSWORD AFTER ISSUING THE TOKEN.
  if (
    user.passwordChangedAt &&
    user.passwordChangedAt.getTime() > decodeToken.iat * 1000
  ) {
    return next(
      new ApiError(
        'User changed password after issuing token. Please login again.',
        400
      )
    );
  }

  req.user = user;

  next();
});

export const forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email)
    return next(
      new ApiError('Please provide your email of your account.', 401)
    );

  const user = await User.findOne({ email });

  if (!user)
    return next(new ApiError('No user exist. Or account is deactivated.', 404));

  //CREATE AND SAVE RESET TOKEN IN DATABASE
  const resetToken = await user.createResetToken();

  await user.save({ validateBeforeSave: false });

  //SEND MAIL TO GIVEN EMAIL

  await sendMail(email, resetToken);

  res.status(200).json({
    status: 'success',
    message: 'Reset link sent to your email. Please check your mail',
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password, passwordConfirm } = req.body;
  if (!token)
    return next(
      new ApiError('Please check your mail to get reset token.', 400)
    );

  if (!password || !passwordConfirm)
    return next(
      new ApiError('Please enter your new password & passwordConfirm.', 401)
    );

  const decryptedResetToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({ resetPasswordToken: token }).select(
    '+passwordResetToken +passwordResetExpire'
  );

  if (!user) {
    return next('Invalid Reset Token, Please check your mail', 401);
  }

  if (
    !user.passwordResetToken ||
    (user.passwordResetExpire &&
      user.passwordResetExpire.getTime() < Date.now())
  ) {
    return next(new ApiError('Reset token expired.', 401));
  }

  user.passwordResetToken = '';
  user.passwordResetExpire = null;
  user.password = password;
  user.passwordConfirm = passwordConfirm;

  await user.save({ validateBeforeSave: true });

  res
    .status(200)
    .json({ status: 'success', message: 'Password changed successfully.' });
});

export const changePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, password, passwordConfirm } = req.body;

  if (!oldPassword || !password || !passwordConfirm)
    return next(
      new ApiError('Please enter oldPassword, password & passwordConfirm.', 400)
    );

  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.correctPassword(oldPassword, user.password)))
    return next(new ApiError('Invalid old password.', 401));

  if (password !== passwordConfirm)
    return next(new ApiError('password & passwordConfirm not match.', 400));

  user.password = password;
  user.passwordConfirm = passwordConfirm;

  await user.save();

  res
    .status(200)
    .json({ status: 'success', message: 'Password Changed Successfully.' });
});

export const updateProfile = catchAsync(async (req, res, next) => {
  const filteredReq = filterFields(
    req.body,
    'name',
    'email',
    'birthDay',
    'interestedIn',
    'profilePicture'
  );

  const user = await User.findByIdAndUpdate(req.user.id, filteredReq, {
    new: true,
  });

  res.status(200).json({ status: 'success', data: user });
});

export const deactivateAccount = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    message: 'Account deactivated successfully.',
  });
});

export const getCurrentUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    data: req.user,
  });
});

export const restrictedTo = (...users) => {
  return (req, res, next) => {
    if (!users.includes(req?.user?.role))
      return next(
        new ApiError(`You're not allowed to access this route.`, 400)
      );
    next();
  };
};

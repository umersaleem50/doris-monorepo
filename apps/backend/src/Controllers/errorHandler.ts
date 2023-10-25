import apiError from '../utilities/apiError';

const handleCastError = (error) => {
  const message = `Invalid ${error.path}:${error.value}`;
  return new apiError(message, 400);
};

const handleValidationError = (error) => {
  const errorMessages = Object.values(error.errors).map(
    (err: { message: string }, i) => err?.message
  );
  return new apiError(errorMessages.join(' '), 400);
};

const handleTokenExpireError = (error) => {
  return new apiError('Token expired, Please login again to get new one.', 400);
};

const handleDublicateFieldsError = (error) => {
  const value = error.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Dublicate value ${value}. Please use another value.`;
  return new apiError(message, 400);
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  }
  res.status(500).json({ status: 'error', message: 'Something went wrong!' });
};

exports.errorHandlerController = (err, req, res, next) => {
  if (process.env.DEV_ENV === 'development') {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    res.status(statusCode).json({ status, message: err.message, error: err });
  }
  if (process.env.DEV_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (err.name === 'CastError') error = handleCastError(err);
    if (err.name === 'ValidationError') error = handleValidationError(err);
    if (err.name === 'TokenExpiredError') error = handleTokenExpireError(err);
    if (err.code === 11000) error = handleDublicateFieldsError(err);
    sendErrorProd(error, req, res);
  }
};

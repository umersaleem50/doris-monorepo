export class ApiError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);

    // this.message = message;
    this.statusCode = statusCode;
    this.status = this.statusCode.toString().startsWith('4')
      ? 'failed'
      : 'success';

    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const golbalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default golbalErrorHandler;

import { NextFunction, Request, Response } from 'express';

const golbalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default golbalErrorHandler;

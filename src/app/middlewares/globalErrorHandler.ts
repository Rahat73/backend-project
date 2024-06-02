import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';

const golbalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  const handleZodError = (err: ZodError) => {
    const errorSouces: TErrorSources = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue.path[issue?.path.length - 1],
        message: issue?.message,
      };
    });

    return {
      statusCode: httpStatus.BAD_REQUEST,
      message: 'Validation Error',
      errorSouces,
    };
  };

  if (err instanceof ZodError) {
    const formattedError = handleZodError(err);
    statusCode = formattedError?.statusCode;
    message = formattedError?.message;
    errorSources = formattedError?.errorSouces;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default golbalErrorHandler;

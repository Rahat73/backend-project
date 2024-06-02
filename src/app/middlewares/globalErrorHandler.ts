import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { Error } from 'mongoose';
import { ZodError } from 'zod';
import config from '../config';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { TErrorSources } from '../interface/error';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/appError';

const golbalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message: string = 'Internal Server Error';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const formattedError = handleZodError(err);
    statusCode = formattedError?.statusCode;
    message = formattedError?.message;
    errorSources = formattedError?.errorSources;
  } else if (err instanceof Error.ValidationError) {
    const formattedError = handleValidationError(err);
    statusCode = formattedError?.statusCode;
    message = formattedError?.message;
    errorSources = formattedError?.errorSources;
  } else if (err instanceof Error.CastError) {
    const formattedError = handleCastError(err);
    statusCode = formattedError?.statusCode;
    message = formattedError?.message;
    errorSources = formattedError?.errorSources;
  } else if (err.code === 11000) {
    const formattedError = handleDuplicateError(err);
    statusCode = formattedError?.statusCode;
    message = formattedError?.message;
    errorSources = formattedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default golbalErrorHandler;

import httpStatus from 'http-status';
import { Error } from 'mongoose';
import { ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';

const handleValidationError = (err: Error.ValidationError) => {
  const errorSouces: TErrorSources = Object.values(err.errors).map(
    (error: Error.ValidatorError | Error.CastError) => {
      return {
        path: error?.path,
        message: error?.message,
      };
    },
  );

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    errorSouces,
  };
};

export default handleValidationError;

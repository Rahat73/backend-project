import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import httpStatus from 'http-status';

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

export default handleZodError;

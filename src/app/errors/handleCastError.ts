import { Error } from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';

const handleCastError = (err: Error.CastError): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  console.log(err);
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Invalid ID',
    errorSources: errorSources,
  };
};

export default handleCastError;

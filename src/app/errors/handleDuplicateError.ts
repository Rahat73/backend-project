import httpStatus from 'http-status';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: Error): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);
  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} aldready exists`,
    },
  ];

  return {
    statusCode: httpStatus.CONFLICT,
    message: 'Duplicate Key Error',
    errorSources,
  };
};

export default handleDuplicateError;

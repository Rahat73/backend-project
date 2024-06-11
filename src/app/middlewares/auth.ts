import httpStatus from 'http-status';
import AppError from '../errors/appError';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

export const auth = () => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // check if the token is sent from the client
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Not authorized to access this route',
      );
    }

    // check if the token is valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Not authorized to access this route',
          );
        }
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

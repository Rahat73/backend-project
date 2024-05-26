import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};

const createStudent = createAsync(async (req, res, next) => {
  const { password, student } = req.body;
  const result = await UserService.createStudentIntoDB(password, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};

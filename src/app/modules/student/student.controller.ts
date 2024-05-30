import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentService } from './student.service';
import studentValidationSchema from './student.validation';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students fetched successfully',
    data: result,
  });
});

const getStudentById = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.getStudentByIdFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students deleted successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getStudentById,
  deleteStudent,
};

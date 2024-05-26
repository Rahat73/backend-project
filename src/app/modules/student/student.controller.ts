import { NextFunction, Request, Response } from 'express';
import { StudentService } from './student.service';
import studentValidationSchema from './student.validation';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getStudentByIdFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentController = {
  getAllStudents,
  getStudentById,
  deleteStudent,
};

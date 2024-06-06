import { startSession } from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userdata: Partial<TUser> = {};

  userdata.password = password || (config.default_password as string);
  userdata.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }

  const session = await startSession();

  try {
    session.startTransaction();

    userdata.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    const newUser = await User.create([userdata], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User creation failed');
    }

    if (newUser.length) {
      studentData.id = newUser[0].id;
      studentData.user = newUser[0]._id;

      const newStudent = await Student.create([studentData], { session });

      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Student creation failed');
      }

      await session.commitTransaction();
      await session.endSession();
      return newStudent[0];
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, (error as Error)?.message);
  }
};

export const UserServices = {
  createStudentIntoDB,
};

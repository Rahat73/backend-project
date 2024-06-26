import { startSession } from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: { path: 'academicFaculty' },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;

  return result;
};

const getStudentByIdFromDB = async (id: string) => {
  // const result = await Student.aggregate([{ $match: { id } }]);
  const result = await Student.findById(id)
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });
  return result;
};

const updateStudentIntoDB = async (
  id: string,
  updateInfo: Partial<TStudent>,
) => {
  const studentExists = await Student.isStudentExists(id);
  if (!studentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  //remainingInfo is the object that contains the fields that are not in the name,guaridan,localGuardian object
  const { name, guardian, localGuardian, ...remainingInfo } = updateInfo;

  const modifiedUpdatedInfo: Record<string, unknown> = { ...remainingInfo };

  // checking if data inside name exists, if so then update it like name.lastName = value
  //cz updating using the name field will replace the whole name object
  if (name && Object.keys(name).length) {
    // using loop cz name can have multiple fields [[firstName: value], [lastName: value]]
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedInfo[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedInfo[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedInfo[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedInfo, {
    new: true,
    revalidate: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // get user _id from deletedStudent
    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};

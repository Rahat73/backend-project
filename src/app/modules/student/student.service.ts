import { startSession } from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  const searchParams = query?.searchParams || '';
  const studentSearchableFields = [
    'name.firstName',
    'name.middleName',
    'name.lastName',
    'email',
  ];
  const excludeFields = ['searchParams', 'sort', 'limit', 'page', 'fields'];

  excludeFields.forEach((field) => delete queryObj[field]);
  console.log(query, queryObj);

  //partial match searching [query -> email=john@gma]
  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      // {$name :{$regex: query.name, $options: 'i'}}
      [field]: { $regex: searchParams, $options: 'i' },
    })),
  });

  //exact field value matching [query -> email=john@gmail.com]
  const filterQuery = searchQuery
    .find(queryObj)
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });

  const sort = (query?.sort as string) || '-createdAt';
  //sorting [query -> sort=id]
  const sortQuery = filterQuery.sort(sort);

  //limiting [query -> limit=1]
  const limit = (Number(query?.limit) as number) || 10;
  const limitQuery = sortQuery.limit(limit);

  //paginating [query -> page=1&limit=1]
  const page = Number(query?.page) || 1;
  const skip = (page - 1) * limit;
  const paginateQuery = limitQuery.skip(skip);

  //fileds limiting [query -> fields=name,email or fields=-name]
  const fields = (query?.fields as string).split(',').join(' ') || '-__v';
  const result = await paginateQuery.select(fields);

  return result;
};

const getStudentByIdFromDB = async (id: string) => {
  // const result = await Student.aggregate([{ $match: { id } }]);
  const result = await Student.findOne({ id })
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

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedInfo, {
    new: true,
    revalidate: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const studentExists = await Student.isStudentExists(id);
  if (!studentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }
  const session = await startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
  }
};

export const StudentService = {
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};

import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { registrationStatus } from './semesterRegistration.constant';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { startSession } from 'mongoose';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the academic semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */

  //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  const isThereAnyUpcomingOrOngoingSEmester =
    await SemesterRegistration.findOne({
      $or: [
        { status: registrationStatus.UPCOMING },
        { status: registrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSEmester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is aready an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`,
    );
  }

  // check if the semester is exist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found !',
    );
  }

  // check if the semester is already registered!
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered!',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSemesterRegistrationByIdFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationByIdFromDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //check if semester is registered
  const isSemesterRegistered = await SemesterRegistration.findById(id);

  if (!isSemesterRegistered) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This semester is not registered!',
    );
  }

  const currentSemesterStatus = isSemesterRegistered.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === registrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ended!`,
    );
  }

  // UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === registrationStatus.UPCOMING &&
    requestedStatus === registrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  if (
    currentSemesterStatus === registrationStatus.ONGOING &&
    requestedStatus === registrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  console.log(payload);
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    // revalidate: true,
  });
  return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
  const session = await startSession();

  //check if semester is registered
  const isSemesterRegistered = await SemesterRegistration.findById(id);
  if (!isSemesterRegistered) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This semester is not registered!',
    );
  }

  //check if semester is upcoming
  if (isSemesterRegistered.status !== registrationStatus.UPCOMING) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not delete a semester that is not upcoming!`,
    );
  }

  try {
    session.startTransaction();
    await OfferedCourse.deleteMany({
      semesterRegistration: id,
    });

    const result = await SemesterRegistration.findByIdAndDelete(id);

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    session.abortTransaction();
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSemesterRegistrationByIdFromDB,
  updateSemesterRegistrationByIdFromDB,
  deleteSemesterRegistrationFromDB,
};

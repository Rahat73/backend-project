import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res, next) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is deleted succesfully',
    data: result,
  });
});

const getAllSemesterRegistrations = catchAsync(async (req, res, next) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is deleted succesfully',
    data: result,
  });
});

const getSemesterRegistrationById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.getSemesterRegistrationByIdFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is deleted succesfully',
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { semesterRegistration } = req.body;
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationByIdFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is deleted succesfully',
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSemesterRegistrationById,
  updateSemesterRegistration,
};

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semesterNameToCodeMapper } from './academicSemester.constant';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const academicSemester = req.body;

  if (
    academicSemester.code !== semesterNameToCodeMapper[academicSemester.name]
  ) {
    throw new Error('Semester Name / Code mismatch');
  }

  const result =
    await AcademicSemesterService.createAcademicSemesterIntoDB(
      academicSemester,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.getAllAcademicSemestersFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semesters retrieved successfully',
    data: result,
  });
});

const getAcademicSemestersById = catchAsync(async (req, res) => {
  const { semesterId } = req.params;

  const result =
    await AcademicSemesterService.getAcademicSemestersByIdFromDB(semesterId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester retrieved successfully',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const updateInfo = req.body;

  if (updateInfo.year || updateInfo.name || updateInfo.code) {
    if (updateInfo.year && updateInfo.name && updateInfo.code) {
      if (updateInfo.code !== semesterNameToCodeMapper[updateInfo.name]) {
        throw new Error('Semester Name / Code mismatch');
      }
    } else {
      throw new Error('Please provide year, name, code fields');
    }
  }

  const result = await AcademicSemesterService.updateAcademicSemesterIntoDB(
    semesterId,
    updateInfo,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester updated successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getAcademicSemestersById,
  updateAcademicSemester,
};

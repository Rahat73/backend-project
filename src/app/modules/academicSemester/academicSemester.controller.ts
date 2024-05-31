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

export const AcademicSemesterController = {
  createAcademicSemester,
};

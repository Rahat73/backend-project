import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const academicFaculty = req.body;
  const result =
    await AcademicFacultyServices.createAcademicFacultyIntoDB(academicFaculty);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculties retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getAcademicFacultyById = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.getAcademicFacultyByIdFromDB(facultyId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty retrieved successfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const updateInfo = req.body;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    updateInfo,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty updated successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getAcademicFacultyById,
  updateAcademicFaculty,
};

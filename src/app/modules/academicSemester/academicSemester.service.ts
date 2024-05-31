import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find({});
  return result;
};

const getAcademicSemestersByIdFromDB = async (semesterId: string) => {
  const result = await AcademicSemester.findOne({ _id: semesterId });
  return result;
};

const updateAcademicSemesterIntoDB = async (
  semesterId: string,
  updateInfo: Partial<TAcademicSemester>,
) => {
  const result = await AcademicSemester.updateOne(
    { _id: semesterId },
    updateInfo,
  );
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getAcademicSemestersByIdFromDB,
  updateAcademicSemesterIntoDB,
};

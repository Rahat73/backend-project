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
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: semesterId },
    updateInfo,
    { new: true },
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getAcademicSemestersByIdFromDB,
  updateAcademicSemesterIntoDB,
};

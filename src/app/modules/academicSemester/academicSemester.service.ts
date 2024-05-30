import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async () => {
  const result = await AcademicSemester.create();
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
};

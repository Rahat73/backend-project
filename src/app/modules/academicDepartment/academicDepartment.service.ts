import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (
  academicDepartmentAcademicDepartment: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.create(
    academicDepartmentAcademicDepartment,
  );
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const getAcademicDepartmentByIdFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  updateInfo: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    updateInfo,
    { new: true },
  );
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getAcademicDepartmentByIdFromDB,
  updateAcademicDepartmentIntoDB,
};

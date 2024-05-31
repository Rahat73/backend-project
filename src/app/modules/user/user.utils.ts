import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudent = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  const currentId = (await findLastStudent()) || '0';

  const incrementId = (parseInt(currentId) + 1).toString().padStart(4, '0');

  const studentId = `${payload.year}${payload.code}${incrementId}`;

  return studentId;
};

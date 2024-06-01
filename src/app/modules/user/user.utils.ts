import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudent = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  const lastStudentId = await findLastStudent();

  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentCode = lastStudentId?.substring(4, 6);
  let incrementId = lastStudentId?.substring(6) || '0001';

  if (lastStudentYear === payload.year && lastStudentCode === payload.code) {
    incrementId = (parseInt(incrementId) + 1).toString().padStart(4, '0');
  } else incrementId = '0001';

  const studentId = `${payload.year}${payload.code}${incrementId}`;

  return studentId;
};

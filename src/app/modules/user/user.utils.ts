import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { Student } from '../student/student.model';
import { User } from './user.model';

export const findLastStudent = async (academicSemesterId: string) => {
  const lastStudent = await Student.findOne(
    { admissionSemester: academicSemesterId },
    { id: 1, _id: 0 },
  )
    .sort({
      id: -1,
    })
    .lean();
  return lastStudent ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  const lastStudentId = await findLastStudent(payload._id);
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentCode = lastStudentId?.substring(4, 6);
  let incrementId = lastStudentId?.substring(6) || '0001';

  if (lastStudentYear === payload.year && lastStudentCode === payload.code) {
    incrementId = (parseInt(incrementId) + 1).toString().padStart(4, '0');
  } else incrementId = '0001';

  const studentId = `${payload.year}${payload.code}${incrementId}`;

  return studentId;
};

// const findLastStudentId = async () => {
//   const lastStudent = await User.findOne(
//     {
//       role: 'student',
//     },
//     {
//       id: 1,
//       _id: 0,
//     },
//   )
//     .sort({
//       createdAt: -1,
//     })
//     .lean();

//   return lastStudent?.id ? lastStudent.id : undefined;
// };

// export const generateStudentId = async (payload: TAcademicSemester) => {
//   let currentId = (0).toString();
//   const lastStudentId = await findLastStudentId();
//   console.log(lastStudentId);

//   const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
//   const lastStudentYear = lastStudentId?.substring(0, 4);
//   console.log(payload);
//   const currentSemesterCode = payload.code;
//   const currentYear = payload.year;

//   if (
//     lastStudentId &&
//     lastStudentSemesterCode === currentSemesterCode &&
//     lastStudentYear === currentYear
//   ) {
//     currentId = lastStudentId.substring(6);
//   }

//   let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

//   incrementId = `${payload.year}${payload.code}${incrementId}`;

//   return incrementId;
// };

// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};

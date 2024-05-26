import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userdata: Partial<TUser> = {};
  userdata.id = '2030100001';
  userdata.password = password || (config.default_password as string);
  userdata.role = 'student';

  const newUser = await User.create(userdata);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};

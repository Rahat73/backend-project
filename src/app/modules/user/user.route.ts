import express from 'express';
import { UserControllers } from './user.controller';
import validationHandler from '../../middlewares/validationHandler';
import { StudentValidations } from '../student/student.validation';
import { AdminValidations } from '../admin/admin.validation';
import { FacultyValidations } from '../faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  validationHandler(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validationHandler(FacultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validationHandler(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;

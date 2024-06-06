import express from 'express';
import { UserControllers } from './user.controller';
import validationHandler from '../../middlewares/validationHandler';
import { StudentValidations } from '../student/student.validation';

const router = express.Router();

router.post(
  '/create-student',
  validationHandler(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);
// router.post('/user/create-faculty', UserController.createFaculty);
// router.post('/user/create-admin', UserController.createAdmin);

export const UserRoutes = router;

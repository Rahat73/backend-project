import express from 'express';
import { StudentControllers } from './student.controller';
import validationHandler from '../../middlewares/validationHandler';
import { StudentValidations } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getStudentById);

router.patch(
  '/:studentId',
  validationHandler(StudentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;

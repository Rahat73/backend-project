import express from 'express';
import { StudentControllers } from './student.controller';
import validationHandler from '../../middlewares/validationHandler';
import { StudentValidations } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router.get('/:id', StudentControllers.getStudentById);

router.patch(
  '/:id',
  validationHandler(StudentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;

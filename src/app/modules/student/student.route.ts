import express from 'express';
import { StudentController } from './student.controller';
import validationHandler from '../../middlewares/validationHandler';
import { StudentValidations } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudents);

router.get('/:studentId', StudentController.getStudentById);

router.patch(
  '/:studentId',
  validationHandler(StudentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
);

router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoute = router;

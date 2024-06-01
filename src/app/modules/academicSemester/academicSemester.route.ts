import { Router } from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
import validationHandler from '../../middlewares/validationHandler';

const router = Router();

router.post(
  '/create-academic-semester',
  validationHandler(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

router.get('/', AcademicSemesterController.getAllAcademicSemesters);

router.get('/:semesterId', AcademicSemesterController.getAcademicSemestersById);

router.patch(
  '/:semesterId',
  validationHandler(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);

export const AcademicSemesterRoute = router;

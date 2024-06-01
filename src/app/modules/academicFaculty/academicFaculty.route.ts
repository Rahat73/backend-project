import { Router } from 'express';
import validationHandler from '../../middlewares/validationHandler';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = Router();

router.post(
  '/create-acdemic-faculty',
  validationHandler(AcademicFacultyValidation.academicFacultyValidationSchema),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAllAcademicFaculties);

router.get('/:facultyId', AcademicFacultyController.getAcademicFacultyById);

router.patch(
  '/:facultyId',
  validationHandler(AcademicFacultyValidation.academicFacultyValidationSchema),
  AcademicFacultyController.updateAcademicFaculty,
);

export const AcademicFacultyRoute = router;

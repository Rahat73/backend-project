import { Router } from 'express';
import validationHandler from '../../middlewares/validationHandler';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = Router();

router.post(
  '/create-academic-department',
  validationHandler(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);

router.get('/', AcademicDepartmentController.getAllAcademicDepartments);

router.get(
  '/:departmentId',
  AcademicDepartmentController.getAcademicDepartmentById,
);

router.patch(
  '/:departmentId',
  validationHandler(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);

export const AcademicDepartmentRoute = router;

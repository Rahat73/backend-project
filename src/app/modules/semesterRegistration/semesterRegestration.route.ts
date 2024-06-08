import { Router } from 'express';
import { SemesterRegistrationControllers } from './semesterRegestration.controller';
import validationHandler from '../../middlewares/validationHandler';
import { SemesterRegestrationValidations } from './semesterRegestration.validation';

const router = Router();

router.post(
  '/create-semester-registration',
  validationHandler(
    SemesterRegestrationValidations.createSemesterRegestrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);

router.get('/', SemesterRegistrationControllers.getAllSemesterRegistrations);

router.get('/:id', SemesterRegistrationControllers.getSemesterRegistrationById);

router.patch(
  '/:id',
  SemesterRegistrationControllers.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;

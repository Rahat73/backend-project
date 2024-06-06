import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import validationHandler from '../../middlewares/validationHandler';

const router = express.Router();

router.get('/:id', FacultyControllers.getFacultyById);

router.patch(
  '/:id',
  validationHandler(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;

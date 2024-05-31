import { Router } from 'express';
import { AcademicSemesterController } from './academicSemester.controller';

const router = Router();

router.post(
  '/create-academic-semester',
  AcademicSemesterController.createAcademicSemester,
);

router.get('/', AcademicSemesterController.getAllAcademicSemesters);

router.get('/:semesterId', AcademicSemesterController.getAcademicSemestersById);

export const AcademicSemesterRouter = router;

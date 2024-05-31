import { z } from 'zod';
import {
  months,
  semesterCode,
  semesterName,
} from './academicSemester.constant';

const academicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...semesterName] as [string, ...string[]]),
    code: z.enum([...semesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...months] as [string, ...string[]]),
    endMonth: z.enum([...months] as [string, ...string[]]),
  }),
});

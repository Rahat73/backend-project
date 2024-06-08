import { z } from 'zod';

const createSemesterRegestrationValidationSchema = z.object({
  body: z.object({}),
});

export const SemesterRegestrationValidations = {
  createSemesterRegestrationValidationSchema,
};

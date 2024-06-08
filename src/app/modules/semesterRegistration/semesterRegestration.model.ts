import { Schema, model } from 'mongoose';
import { TSemesterRegistration } from './semesterRegestration.interface';

const semesterRegestrationSchema = new Schema<TSemesterRegistration>({});

export const SemesterRegistration = model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegestrationSchema,
);

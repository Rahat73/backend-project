import { Schema, model } from 'mongoose';
import {
  TAcademicSemester,
  TMonth as TMonths,
  TSemesterCode,
  TSemesterName,
} from './academicSemester.interface';

const months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const semesterName: TSemesterName[] = ['Autumn', 'Summer', 'Fall'];

const semesterCode: TSemesterCode[] = ['01', '02', '03'];

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: semesterName,
    required: true,
  },
  code: {
    type: String,
    enum: semesterCode,
    required: true,
  },
  year: { type: Date, required: true },
  startMonth: { type: String, enum: months, required: true },
  endMonth: { type: String, enum: months, required: true },
});

const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);

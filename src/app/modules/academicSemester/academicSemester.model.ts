import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  months,
  semesterCode,
  semesterName,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
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
    year: { type: String, required: true },
    startMonth: { type: String, enum: months, required: true },
    endMonth: { type: String, enum: months, required: true },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isYearExist = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isYearExist) {
    throw new Error('Academic Semester already exist for this year');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);

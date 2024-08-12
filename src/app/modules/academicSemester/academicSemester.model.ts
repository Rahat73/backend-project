import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  months,
  semesterCode,
  semesterName,
} from './academicSemester.constant';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

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
  const isSemesterExist = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Academic Semester already exist for this year',
    );
  }
  next();
});

academicSemesterSchema.pre('updateOne', async function (next) {
  const update = this.getUpdate() as Partial<TAcademicSemester>;

  if (update.year && update.name && update.code) {
    const isSemesterExist = await AcademicSemester.findOne({
      year: update.year,
      name: update.name,
    });
    if (isSemesterExist) {
      throw new AppError(
        httpStatus.CONFLICT,
        'Academic Semester already exist for this year',
      );
    }
  }

  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);

import { Types } from 'mongoose';

export type TSemesterRegistration = {
  academicSemester: Types.ObjectId;
  status: string;
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};

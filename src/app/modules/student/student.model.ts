import { Schema, model } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'First Name should be less than 20 characters'],
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'Last Name should be less than 20 characters'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'Father Name should be less than 50 characters'],
  },
  fatherOccupation: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'Father Occupation should be less than 50 characters'],
  },
  fatherContactNo: { type: String, required: true },
  motherName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'Mother Name should be less than 50 characters'],
  },
  motherOccupation: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'Mother Occupation should be less than 50 characters'],
  },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'Name should be less than 50 characters'],
  },
  relation: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'Relation should be less than 20 characters'],
  },
  contactNo: { type: String, required: true },
  occupation: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'Occupation should be less than 50 characters'],
  },
  address: {
    type: String,
    required: true,
    maxlength: [100, 'Address should be less than 100 characters'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    name: { type: userNameSchema, required: true },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid gender',
      },
      required: true,
    },
    dateOfBirth: { type: Date },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    permanentAddress: {
      type: String,
      required: true,
      maxlength: [100, 'Permanent Address should be less than 100 characters'],
    },
    presentAddress: {
      type: String,
      required: true,
      maxlength: [100, 'Present Address should be less than 100 characters'],
    },
    course: { type: String, required: [true, 'Course is required'] },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImg: { type: String, default: '' },
    isDeleted: { type: Boolean, default: false },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

studentSchema.virtual('fullname').get(function () {
  return `${(this?.name?.firstName as string) || ''} ${(this?.name?.middleName as string) || ''} ${(this?.name?.lastName as string) || ''}`;
});

studentSchema.statics.isStudentExists = async function (id: string) {
  const existingStudent = await Student.findOne({ id });
  return existingStudent;
};
// using instance method
// studentSchema.methods.isStudentExists = async function (id: string) {
//   const existingStudent = await Student.findOne({ id });
//   return existingStudent;
// };

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// [ { $match: { isDeleted: { $ne: true } } ,{ '$match': { id: 'STU002' } } ]
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Student = model<TStudent, StudentModel>('Student', studentSchema);

// Student.init().then(() => {
//   console.log('Indexes created');
// });

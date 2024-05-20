import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import config from '../../config';

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
    password: {
      type: String,
      required: true,
      maxlength: [20, 'Password must be under 20 characters'],
    },
    name: { type: userNameSchema, required: true },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not valid gender',
      },
      required: true,
    },
    dateOfBirth: { type: String },
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
    profileImg: { type: String },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

studentSchema.virtual('fullname').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
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

studentSchema.pre('save', async function (next) {
  const student = this;
  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

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

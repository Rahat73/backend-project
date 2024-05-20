import { Schema, model } from 'mongoose';
import {
  StudentMethods,
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

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: { type: String, required: true, unique: true },
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
});

studentSchema.methods.isStudentExists = async function (id: string) {
  const existingStudent = await Student.findOne({ id });
  return existingStudent;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);

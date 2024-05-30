import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First Name should be less than 20 characters'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .trim()
    .max(20, 'Last Name should be less than 20 characters'),
});

const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .trim()
    .max(50, 'Father Name should be less than 50 characters'),
  fatherOccupation: z
    .string()
    .trim()
    .max(50, 'Father Occupation should be less than 50 characters'),
  fatherContactNo: z.string(),
  motherName: z
    .string()
    .trim()
    .max(50, 'Mother Name should be less than 50 characters'),
  motherOccupation: z
    .string()
    .trim()
    .max(50, 'Mother Occupation should be less than 50 characters'),
  motherContactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
  name: z.string().trim().max(50, 'Name should be less than 50 characters'),
  relation: z
    .string()
    .trim()
    .max(20, 'Relation should be less than 20 characters'),
  contactNo: z.string(),
  occupation: z
    .string()
    .trim()
    .max(50, 'Occupation should be less than 50 characters'),
  address: z.string().max(100, 'Address should be less than 100 characters'),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6, 'Password should be at least 6 characters'),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female'], {
        errorMap: (val) => ({ message: `Invalid gender` }),
      }),
      dateOfBirth: z.date().optional(),
      email: z.string().email({ message: 'Invalid email address' }),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      permanentAddress: z
        .string()
        .max(100, 'Permanent Address should be less than 100 characters'),
      presentAddress: z
        .string()
        .max(100, 'Present Address should be less than 100 characters'),
      course: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};

import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string().trim().max(20).required().messages({
    'string.max': 'First Name should be less than 20 characters',
    'any.required': 'First Name is required',
  }),
  middleName: Joi.string().trim(),
  lastName: Joi.string().trim().max(20).required().messages({
    'string.max': 'Last Name should be less than 20 characters',
    'any.required': 'Last Name is required',
  }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().max(50).required().messages({
    'string.max': 'Father Name should be less than 50 characters',
    'any.required': 'Father Name is required',
  }),
  fatherOccupation: Joi.string().trim().max(50).required().messages({
    'string.max': 'Father Occupation should be less than 50 characters',
    'any.required': 'Father Occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'any.required': 'Father Contact Number is required',
  }),
  motherName: Joi.string().trim().max(50).required().messages({
    'string.max': 'Mother Name should be less than 50 characters',
    'any.required': 'Mother Name is required',
  }),
  motherOccupation: Joi.string().trim().max(50).required().messages({
    'string.max': 'Mother Occupation should be less than 50 characters',
    'any.required': 'Mother Occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'any.required': 'Mother Contact Number is required',
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().max(50).required().messages({
    'string.max': 'Name should be less than 50 characters',
    'any.required': 'Name is required',
  }),
  relation: Joi.string().trim().max(20).required().messages({
    'string.max': 'Relation should be less than 20 characters',
    'any.required': 'Relation is required',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Contact Number is required',
  }),
  occupation: Joi.string().trim().max(50).required().messages({
    'string.max': 'Occupation should be less than 50 characters',
    'any.required': 'Occupation is required',
  }),
  address: Joi.string().max(100).required().messages({
    'string.max': 'Address should be less than 100 characters',
    'any.required': 'Address is required',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': '{#value} is not a valid gender',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': '{#value} is not a valid email',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Contact Number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'any.required': 'Emergency Contact Number is required',
  }),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  permanentAddress: Joi.string().max(100).required().messages({
    'string.max': 'Permanent Address should be less than 100 characters',
    'any.required': 'Permanent Address is required',
  }),
  presentAddress: Joi.string().max(100).required().messages({
    'string.max': 'Present Address should be less than 100 characters',
    'any.required': 'Present Address is required',
  }),
  course: Joi.string().required().messages({
    'any.required': 'Course is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local Guardian information is required',
  }),
  profileImg: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;

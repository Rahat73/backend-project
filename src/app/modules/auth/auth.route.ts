import express from 'express';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validationHandler from '../../middlewares/validationHandler';
import { USER_ROLE } from '../user/user.constant';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/login',
  validationHandler(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validationHandler(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllers.refreshToken,
// );

export const AuthRoutes = router;

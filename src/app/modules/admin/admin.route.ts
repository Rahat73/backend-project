import express from 'express';
import { updateAdminValidationSchema } from './admin.validation';
import validationHandler from '../../middlewares/validationHandler';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validationHandler(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;

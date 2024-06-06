import express from 'express';
import { updateAdminValidationSchema } from './admin.validation';
import validationHandler from '../../middlewares/validationHandler';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getAdminById);

router.patch(
  '/:id',
  validationHandler(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:id', AdminControllers.deleteAdmin);

export const AdminRoutes = router;

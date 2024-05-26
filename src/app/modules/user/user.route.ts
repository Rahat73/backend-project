import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create-student', UserController.createStudent);
// router.post('/user/create-faculty', UserController.createFaculty);
// router.post('/user/create-admin', UserController.createAdmin);

export const UserRouter = router;

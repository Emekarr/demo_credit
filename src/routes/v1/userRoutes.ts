import { Router } from 'express';
import UserController from '../../app/user/controller/userController';

const router = Router();

router.post('/create', UserController.createUser);

export default router;

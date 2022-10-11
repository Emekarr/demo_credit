import { Router } from 'express';
import UserController from '../../app/user/controller/userController';
import AuthMiddleware from '../../middleware/auth';

const router = Router();

router.post('/create', UserController.createUser);

router.get('/profile', AuthMiddleware, UserController.fetchUser);

export default router;

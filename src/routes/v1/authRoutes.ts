import { Router } from 'express';
import AuthrController from '../../app/auth/controller';

const router = Router();

router.post('/login', AuthrController.loginUser);

export default router;

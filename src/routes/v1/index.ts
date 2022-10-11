import { Router } from 'express';

import userRoutes from './userRoutes';

import authRoutes from './authRoutes';

import paymentRoutes from './paymentRoutes';

const router = Router();

router.use('/user', userRoutes);

router.use('/auth', authRoutes);

router.use('/payment', paymentRoutes);

export default router;

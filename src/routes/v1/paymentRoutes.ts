import { Router } from 'express';
import PaymentController from '../../app/payment/controllers/paymentController';
import AuthMiddleware from '../../middleware/auth';

const router = Router();

router.post(
	'/top-up/card',
	AuthMiddleware,
	PaymentController.creditWalletCard,
);

export default router;

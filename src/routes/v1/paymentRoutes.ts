import { Router } from 'express';
import PaymentController from '../../app/payment/controllers/paymentController';
import AuthMiddleware from '../../middleware/auth';

const router = Router();

router.post('/top-up/card', AuthMiddleware, PaymentController.creditWalletCard);

router.post(
	'/validate-charge',
	AuthMiddleware,
	PaymentController.validateCharge,
);

router.post(
	'/transfer/in-app',
	AuthMiddleware,
	PaymentController.executeInAppTransfer,
);

router.post('/payout', AuthMiddleware, PaymentController.initiatePayOut);

export default router;

import { Router } from 'express';
import WalletController from '../../app/wallet/controllers/walletController';
import AuthMiddleware from '../../middleware/auth';

const router = Router();

router.get('/fetch', AuthMiddleware, WalletController.fetchWallet);

export default router;

import { Router } from 'express';
import TransactionController from '../../app/transaction/controllers/transactionController';
import AuthMiddleware from '../../middleware/auth';

const router = Router();

router.get('/fetch', AuthMiddleware, TransactionController.fetchTransactions);

export default router;

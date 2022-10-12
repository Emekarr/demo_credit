import CreateTransactionUseCase from '../app/transaction/usecases/CreateTransactionUseCase';
import CreateWalletUseCase from '../app/wallet/usecases/CreateWalletUseCase';
import UpdateWalletUseCase from '../app/wallet/usecases/UpdateWalletUseCase';
import { EmitterEventType, UserCreatedPayload } from './type.events';
import walletRepository from '../app/wallet/repository/walletRepository';

export default {
	USER: {
		USER_CREATED: {
			EVENT: 'USER_CREATED',
			ACTION: async (payload: any[]) => {
				const data = payload[0] as UserCreatedPayload;
				await CreateWalletUseCase.execute(data.userId, data.trxId);
			},
		} as EmitterEventType,
		ACCOUNT_VERIFIED: {
			EVENT: 'ACCOUNT_VERIFIED',
			ACTION: async () => {},
		} as EmitterEventType,
	},
	PAYMENT: {
		TOPUP_PAYMENT: {
			EVENT: 'CARD_TOPUP_PAYMENT_MADE',
			ACTION: async ([trx, paymentTrx]: any[]) => {
				await CreateTransactionUseCase.execute(trx, paymentTrx, true);
			},
		} as EmitterEventType,
		PAYOUT_COMPLETED: {
			EVENT: 'PAYOUT_COMPLETED',
			ACTION: async ([paymentTrx, walletBalance, walletId]: any[]) => {
				const trx = await walletRepository.startTransaction();
				await CreateTransactionUseCase.execute(paymentTrx, trx, false);
				await UpdateWalletUseCase.execute(walletId, walletBalance, trx, true);
			},
		} as EmitterEventType,
	},
};

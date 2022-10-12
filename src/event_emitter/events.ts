import {
	Actions,
	PaymentTypes,
	Status,
} from '../app/payment/constants.payment';
import { TransactionType } from '../app/transaction/model/Transaction';
import CreateTransactionUseCase from '../app/transaction/usecases/CreateTransactionUseCase';
import CreateWalletUseCase from '../app/wallet/usecases/CreateWalletUseCase';
import { EmitterEventType, UserCreatedPayload } from './type.events';

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
			ACTION: async (trx: TransactionType[]) => {
				await CreateTransactionUseCase.execute(trx[0]);
			},
		} as EmitterEventType,
	},
};

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
};

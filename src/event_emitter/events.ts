import { EmitterEventType } from './type.events';

export default {
	USER: {
		USER_CREATED: {
			EVENT: 'USER_CREATED',
			ACTION: async () => {},
		} as EmitterEventType,
		ACCOUNT_VERIFIED: {
			EVENT: 'ACCOUNT_VERIFIED',
			ACTION: async () => {},
		} as EmitterEventType,
	},
};

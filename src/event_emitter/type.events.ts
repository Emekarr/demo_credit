import { DatabaseTransactionType } from '../database/repository/type.repository';

export interface EmitterEventType {
	EVENT: string;
	ACTION: (...args: any) => void;
}

export interface UserCreatedPayload {
	userId: string;
	trxId: DatabaseTransactionType;
}

export interface RepositoryType {
	createOne: (payload: any, opts: any) => any;
	updateOneById: (id: string, payload: any, opts: any) => any;
	updateOneByFilter: (filter: any, payload: any, opts: any) => any;
	findOneById: (id: string, opts: any) => any;
	findOneByFilter: (filter: any, opts: any) => any;
	findManyByFilter: (filter: any, opts: any) => any;
	deleteOneById: (id: string, opts: any) => any;
	deleteOneByFilter: (filter: any, opts: any) => any;

	createOneTrx: (
		payload: any,
		transactionId: DatabaseTransactionType,
		opts: any,
	) => any;
	updateOneByIdTrx: (
		id: string,
		transactionId: DatabaseTransactionType,
		payload: any,
		opts: any,
	) => any;
	updateOneByFilterTrx: (
		filter: any,
		transactionId: DatabaseTransactionType,
		payload: any,
		opts: any,
	) => any;
	deleteOneByIdTrx: (
		id: string,
		transactionId: DatabaseTransactionType,
		opts: any,
	) => any;
	deleteOneByFilterTrx: (
		filter: any,
		transactionId: DatabaseTransactionType,
		opts: any,
	) => any;
	startTransaction: () => any;
}

export interface RepositoryMethodOptions {
	returnCreated: boolean;
	selectedFields: string[];
	commitTransaction: boolean;
}

export interface BaseModelType {
	id: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface DatabaseTransactionType {}

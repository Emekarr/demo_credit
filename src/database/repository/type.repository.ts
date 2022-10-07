export interface RepositoryType {
	createOne: (payload: any, opts: any) => any;
	findOneById: (id: string, opts: any) => any;
	findOneByFilter: (filter: any, opts: any) => any;
	findManyByFilter: (filter: any, opts: any) => any;
	deleteOneById: (id: string, opts: any) => any;
	deleteOneByFilter: (filter: any, opts: any) => any;
}

export interface RepositoryMethodOptions {
	returnCreated: boolean;
	selectedFields: string[];
}

export interface BaseModelType {
	id: string;
	createdAt: Date;
	updatedAt: Date;
}

import {
	BaseModelType,
	RepositoryMethodOptions,
	RepositoryType,
} from './type.repository';
import { Knex } from 'knex';
import dbInstances from '../db_instances';

export default class KnexRepository<T extends BaseModelType>
	implements RepositoryType
{
	private knex: Knex<any, unknown[]> = (dbInstances as any)['knex'];

	constructor(private tableName: string) {}

	async createOne(payload: T, opts: Partial<RepositoryMethodOptions>) {
		const result = await this.knex.insert(payload);
		return opts.returnCreated ? result : true;
	}

	async findOneById(id: string, opts: Partial<RepositoryMethodOptions>) {
		return await this.knex.select().from<T>(this.tableName).where('id', id);
	}

	async findOneByFilter(
		filter: Partial<T>,
		opts: Partial<RepositoryMethodOptions>,
	) {
		return await this.knex
			.select(...(opts.selectedFields || []))
			.from<T>(this.tableName)
			.where(filter);
	}

	async findManyByFilter(
		filter: Partial<T>,
		opts: Partial<RepositoryMethodOptions>,
	) {
		return await this.knex
			.select(...(opts.selectedFields || []))
			.from<T>(this.tableName)
			.where(filter);
	}

	async deleteOneById(id: string, opts: Partial<RepositoryMethodOptions>) {
		return await this.knex.from<T>(this.tableName).where('id', id).del();
	}

	async deleteOneByFilter(
		filter: Partial<T>,
		opts: Partial<RepositoryMethodOptions>,
	) {
		return await this.knex.from<T>(this.tableName).where(filter).del();
	}
}

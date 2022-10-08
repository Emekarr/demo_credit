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
	_knex: any;
	public get knex(): Knex<any, unknown[]> {
		return (dbInstances as any)['knex'];
	}

	constructor(private tableName: string) {}

	async createOne(payload: Partial<T>, opts: Partial<RepositoryMethodOptions>) {
		const result = await this.knex.from(this.tableName).insert(payload);
		return opts.returnCreated ? result : true;
	}

	async updateOneById(
		id: string,
		payload: Partial<T>,
		opts: Partial<RepositoryMethodOptions>,
	) {
		return this.knex(this.tableName)
			.select(...(opts.selectedFields || []))
			.where('id', id)
			.update(payload);
	}

	async updateOneByFilter(
		filter: Partial<T>,
		payload: Partial<T>,
		opts: Partial<RepositoryMethodOptions>,
	) {
		return this.knex(this.tableName)
			.select(...(opts.selectedFields || []))
			.where(filter)
			.update(payload);
	}

	async findOneById(id: string, opts: Partial<RepositoryMethodOptions>) {
		return await this.knex
			.select(...(opts.selectedFields || []))
			.from<T>(this.tableName)
			.where('id', id);
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

	async startTransaction() {
		return await this.knex.transaction();
	}

	async createOneTrx(
		payload: T,
		transaction: Knex.Transaction,
		opts: Partial<RepositoryMethodOptions>,
	) {
		try {
			const result = await transaction(this.tableName).insert(payload);
			if (opts.commitTransaction) transaction.commit();
			return opts.returnCreated ? result : true;
		} catch (err) {
			transaction.rollback();
		}
	}

	async updateOneByIdTrx(
		id: string,
		payload: Partial<T>,
		transaction: Knex.Transaction,
		opts: Partial<RepositoryMethodOptions>,
	) {
		try {
			const result = transaction(this.tableName)
				.select(...(opts.selectedFields || []))
				.where('id', id)
				.update(payload);
			if (opts.commitTransaction) transaction.commit();
			return result;
		} catch (err) {
			transaction.rollback();
		}
	}

	async updateOneByFilterTrx(
		filter: Partial<T>,
		payload: Partial<T>,
		transaction: Knex.Transaction,
		opts: Partial<RepositoryMethodOptions>,
	) {
		try {
			const result = transaction(this.tableName)
				.select(...(opts.selectedFields || []))
				.where(filter)
				.update(payload);
			if (opts.commitTransaction) transaction.commit();
			return result;
		} catch (err) {
			transaction.rollback();
		}
	}

	async deleteOneByIdTrx(
		id: string,
		transaction: Knex.Transaction,
		opts: Partial<RepositoryMethodOptions>,
	) {
		try {
			const result = await transaction
				.from<T>(this.tableName)
				.where('id', id)
				.del();
			if (opts.commitTransaction) transaction.commit();
			return result;
		} catch (err) {
			transaction.rollback();
		}
	}

	async deleteOneByFilterTrx(
		filter: Partial<T>,
		transaction: Knex.Transaction,
		opts: Partial<RepositoryMethodOptions>,
	) {
		try {
			const result = await transaction
				.from<T>(this.tableName)
				.where(filter)
				.del();
			if (opts.commitTransaction) transaction.commit();
			return result;
		} catch (err) {
			transaction.rollback();
		}
	}
}

import { Knex } from 'knex';

import { BaseModelType } from '../../../database/repository/type.repository';
import db_instances from '../../../database/db_instances';
const knexInstance: Knex<any, unknown[]> = (db_instances as any)['knex'];

export interface UserType extends BaseModelType {
	username: string;
	email: string;
	password: string;
}

const UserModel = knexInstance.schema.createTable(
	'Users',
	(tb: Knex.CreateTableBuilder) => {
		tb.string('id').primary();
		tb.string('email').unique().notNullable();
		tb.string('username').unique().notNullable();
	},
);

export default UserModel;

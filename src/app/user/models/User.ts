import { Knex } from 'knex';

import { BaseModelType } from '../../../database/repository/type.repository';
import { generateDbId } from '../../../database/utils';

export interface UserType extends BaseModelType {
	username: string;
	email: string;
	password: string;
}

export default (kn: Knex) => {
	return kn.schema.createTable('Users', (tb: Knex.CreateTableBuilder) => {
		tb.string('id').primary().defaultTo(generateDbId());
		tb.string('email').unique().notNullable();
		tb.string('username').unique().notNullable();
		tb.string('password').unique().notNullable();
		tb.timestamp('createdAt').defaultTo(kn.fn.now());
		tb.timestamp('updatedAt').defaultTo(kn.fn.now());
	});
};

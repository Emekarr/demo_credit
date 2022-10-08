import { Knex } from 'knex';

import { BaseModelType } from '../../../database/repository/type.repository';
import { generateDbId } from '../../../database/utils';

export interface WalletType extends BaseModelType {
	userId: string;
	balance: number;
}

export default (kn: Knex) => {
	return kn.schema.createTable('Wallets', (tb: Knex.CreateTableBuilder) => {
		tb.string('id').primary().defaultTo(generateDbId());
		tb.string('userId')
			.references('id')
			.inTable('Users')
			.unique()
			.notNullable();
		tb.float('balance', 11, 2).defaultTo(0);
		tb.timestamp('createdAt').defaultTo(kn.fn.now());
		tb.timestamp('updatedAt').defaultTo(kn.fn.now());
	});
};

import { Knex } from 'knex';

import { BaseModelType } from '../../../database/repository/type.repository';

export interface TransactionType extends BaseModelType {
	sentFrom: string;
	sentTo: string;
	balance: number;
	transactionId: string;
	description: string;
	action: string;
	status: string;
	paymentType: string;
	amount: string;
}

export default (kn: Knex) => {
	return kn.schema.createTable(
		'Transactions',
		(tb: Knex.CreateTableBuilder) => {
			tb.string('id').primary();
			tb.string('sentFrom').references('id').inTable('Wallets').notNullable();
			tb.string('sentTo').references('id').inTable('Wallets').notNullable();
			tb.float('balance', 11, 2).notNullable();
			tb.string('transactionId').notNullable();
			tb.string('paymentType').notNullable();
			tb.string('action').notNullable();
			tb.string('description').notNullable();
			tb.string('status').notNullable();
			tb.string('amount').notNullable();
			tb.timestamp('createdAt').defaultTo(kn.fn.now());
			tb.timestamp('updatedAt').defaultTo(kn.fn.now());
		},
	);
};

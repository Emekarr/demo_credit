import { Knex } from 'knex';
import Transaction from '../../../app/transaction/model/Transaction';

export async function up(knex: Knex): Promise<void> {
	return Transaction(knex);
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('Transactions');
}

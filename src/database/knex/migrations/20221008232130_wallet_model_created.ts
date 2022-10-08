import { Knex } from 'knex';
import Wallet from '../../../app/wallet/models/Wallet';

export async function up(knex: Knex): Promise<void> {
	return Wallet(knex);
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('Wallets');
}

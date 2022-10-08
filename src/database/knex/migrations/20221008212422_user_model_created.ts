import { Knex } from 'knex';
import User from '../../../app/user/models/User';

export async function up(knex: Knex): Promise<void> {
	return User(knex);
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('Users');
}

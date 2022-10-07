import db_instances from './db_instances';
import knex from './knex';

export default {
	knex: () => {
		const { knexInstance } = knex();
		(db_instances as any).knex = knexInstance;
		console.log('connected to db using knex client');
	},
};

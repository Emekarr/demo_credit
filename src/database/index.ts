import db_instances from './db_instances';
import { connectToDB } from './knex/knexfile';

export default {
	knex: () => {
		const { knexInstance } = connectToDB();
		(db_instances as any).knex = knexInstance;
		console.log('connected to db using knex client');
	},
};

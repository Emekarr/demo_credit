import knex from './knex';

export default {
	knex: () => {
		knex();
		console.log('connected to db using knex client');
	},
};

import { Knex, knex } from 'knex';

const config: Knex.Config = {
	client: 'mysql',
	connection: process.env.DATABASE_URL,
	useNullAsDefault: true,
	migrations: {
		directory: './migrations',
	},
};

export const connectToDB = () => {
	const knexInstance = knex(config);

	return {
		knexInstance,
	};
};

export default config;

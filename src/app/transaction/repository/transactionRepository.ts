import KnexRepository from '../../../database/repository/knex';
import { TransactionType } from '../model/Transaction';

class TransactionRepository extends KnexRepository<TransactionType> {
	constructor() {
		super('Transactions');
	}
}

export default Object.freeze(new TransactionRepository());

import KnexRepository from '../../../database/repository/knex';
import { WalletType } from '../models/Wallet';

class WalletRepository extends KnexRepository<WalletType> {
	constructor() {
		super('Wallets');
	}
}

export default Object.freeze(new WalletRepository());

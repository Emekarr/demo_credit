import KnexRepository from '../../../database/repository/knex';
import { UserType } from '../models/User';

class UserRepository extends KnexRepository<UserType> {
	constructor() {
		super('Users');
	}
}

export default Object.freeze(new UserRepository());

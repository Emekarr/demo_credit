import CustomError from '../../../errors/customError';
import { UserType } from '../models/User';
import { validateNewUserData } from '../validation/userValidation';
import userRepository from '../repository/userRepository';
import Emitter from '../../../event_emitter/emitter';
import events from '../../../event_emitter/events';
import { generateDbId } from '../../../database/utils';
import Hasher from '../../../authentication/hasher';

export default abstract class CreateNewUserUseCase {
	private static validateNewUserData = validateNewUserData;

	private static userRepository = userRepository;

	private static hasher = Hasher;

	private static emitter = Emitter;

	private static events = events;

	static async execute(payload: UserType) {
		payload.id = generateDbId();
		const result = this.validateNewUserData(payload);
		if (result.error) throw new CustomError(result.error.message, 400);
		await Promise.all([
			this.rejectOnUserExists({ username: result.value.username }),
			this.rejectOnUserExists({ email: result.value.email }),
		]);
		result.value.password = await this.hasher.hashPassword(
			result.value.password,
		);
		const trxId = await this.userRepository.startTransaction();
		const user = await this.userRepository.createOneTrx(result.value, trxId, {
			returnCreated: true,
			commitTransaction: false,
		});
		this.emitter.emit(this.events.USER.USER_CREATED.EVENT, {
			userId: payload.id,
			trxId,
		});
		return user;
	}

	// to work properly filter should contain only 1 key and value
	private static async rejectOnUserExists(filter: Partial<UserType>) {
		const user = await this.userRepository.findOneByFilter(filter, {});
		if (user) {
			throw new CustomError(
				`user with ${Object.keys(filter)[0]} already exists`,
				409,
			);
		}
	}
}

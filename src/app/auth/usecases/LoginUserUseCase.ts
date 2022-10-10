import CustomError from '../../../errors/customError';
import userRepository from '../../user/repository/userRepository';
import { CredentialsType } from '../type.auth';
import { validateCredentials } from '../validation/authValidation';
import Hasher from '../../../authentication/hasher';
import { UserType } from '../../user/models/User';

export default abstract class LoginUserUseCase {
	private static userRepository = userRepository;

	private static validateCredentials = validateCredentials;

	private static hasher = Hasher;

	static async execute(credentials: CredentialsType) {
		const result = this.validateCredentials(credentials);
		if (result.error) throw new CustomError(result.error.message, 400);
		if (!result.value.email && !result.value.username)
			throw new CustomError('either username or email is needed to login', 400);
		let user: UserType;
		if (result.value.email) {
			user = await this.userRepository.findOneByFilter(
				{
					email: result.value.email,
				},
				{},
			);
			if (!user)
				throw new CustomError(
					`user with email ${result.value.email} does not exist`,
					404,
				);
		} else {
			user = await this.userRepository.findOneByFilter(
				{
					username: result.value.username,
				},
				{},
			);
			if (!user)
				throw new CustomError(
					`user with username ${result.value.username} does not exist`,
					404,
				);
		}
		const success = await this.hasher.verifyPassword(
			result.value.password,
			user?.password,
		);
		if (!success) throw new CustomError('incorrect password sent', 401);
	}
}

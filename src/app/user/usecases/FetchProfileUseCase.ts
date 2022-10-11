import userRepository from '../repository/userRepository';

export default abstract class FetchProfileUseCase {
	private static userRepository = userRepository;

	static async execute(id: string) {
		const user = await this.userRepository.findOneById(id, {});
		return user;
	}
}

import walletRepository from '../repository/walletRepository';

export default abstract class FetchWalletUseCase {
	private static walletRepository = walletRepository;

	static async execute(id: string) {
		const wallet = await this.walletRepository.findOneByFilter(
			{ userId: id },
			{},
		);
		return wallet;
	}
}

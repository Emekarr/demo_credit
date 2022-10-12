import { DatabaseTransactionType } from '../../../database/repository/type.repository';
import CustomError from '../../../errors/customError';
import walletRepository from '../repository/walletRepository';
import { validateWalletBalanceUpdate } from '../validators/walletValidation';

export default abstract class UpdateWalletUseCase {
	private static walletRepository = walletRepository;

	private static validateWalletBalanceUpdate = validateWalletBalanceUpdate;

	static async execute(
		walletId: string,
		balance: number,
		transaction: DatabaseTransactionType,
		commitTransaction: boolean,
	) {
		const result = this.validateWalletBalanceUpdate(balance);
		if (result.error) throw new CustomError(result.error.message, 400);
		const wallet = await this.walletRepository.updateOneByFilterTrx(
			{
				id: walletId,
			},
			{
				balance: result.value.balance,
			},
			transaction,
			{ commitTransaction },
		);
		return wallet;
	}
}

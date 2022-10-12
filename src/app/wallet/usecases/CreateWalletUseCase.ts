import { PaymentTransactionType } from '../../../database/repository/type.repository';
import { generateDbId } from '../../../database/utils';
import CustomError from '../../../errors/customError';
import { WalletType } from '../models/Wallet';
import walletRepository from '../repository/walletRepository';
import { validateNewWalletData } from '../validators/walletValidation';

export default abstract class CreateWalletUseCase {
	private static walletRepository = walletRepository;
	private static validateNewWalletData = validateNewWalletData;

	static async execute(userId: string, trxId: PaymentTransactionType) {
		const payload: Partial<WalletType> = {
			id: generateDbId(),
			userId,
		};
		const result = this.validateNewWalletData(payload as WalletType);
		if (result.error) throw new CustomError(result.error.message, 400);
		const wallet = await this.walletRepository.createOneTrx(
			result.value,
			trxId,
			{
				commitTransaction: true,
			},
		);
		return wallet;
	}
}

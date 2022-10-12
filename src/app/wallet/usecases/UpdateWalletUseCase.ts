import { number } from 'joi';
import { Knex } from 'knex';
import { TransactionType } from '../../../database/repository/type.repository';
import { generateDbId } from '../../../database/utils';
import CustomError from '../../../errors/customError';
import { WalletType } from '../models/Wallet';
import walletRepository from '../repository/walletRepository';
import { validateWalletBalanceUpdate } from '../validators/walletValidation';

export default abstract class UpdateWalletUseCase {
	private static walletRepository = walletRepository;

	private static validateWalletBalanceUpdate = validateWalletBalanceUpdate;

	static async execute(
		walletId: string,
		balance: number,
		transaction: TransactionType,
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

// import CustomError from '../../../errors/customError';
// import { TransferMoneyType } from '../../../services/payments/type.payments';
// import { validateTransferMoneyData } from '../validators/paymentValidation';
// import transactionRepository from '../../transaction/repository/transactionRepository';
// import { fetchWalletBalance } from '../utils';

// export default abstract class TransferMoneyUseCase {
// 	private static validateTransferMoneyData = validateTransferMoneyData;

// 	private static transactionRepository = transactionRepository;

// 	private static fetchWalletBalance = fetchWalletBalance;

// 	static async execute(data: TransferMoneyType) {
// 		const result = this.validateTransferMoneyData(data);
// 		if (result.error) throw new CustomError(result.error.message, 400);
// 		const { id: senderWalletId, balance: senderWalletBalance } =
// 			await this.fetchWalletBalance(result.value.sender);
// 		if (senderWalletBalance < result.value.amount)
// 			throw new CustomError('insufficient funds', 400);
// 		const { id: recieverWalletId, balance: recieverWalletBalance } =
// 			await this.fetchWalletBalance(result.value.reciever);

// 		const trx = await this.transactionRepository.startTransaction();
// 	}
// }

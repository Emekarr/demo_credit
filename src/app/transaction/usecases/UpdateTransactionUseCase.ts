import { generateDbId } from '../../../database/utils';
import CustomError from '../../../errors/customError';
import { TransactionType } from '../model/Transaction';
import { DatabaseTransactionType } from '../../../database/repository/type.repository';
import transactionRepository from '../repository/transactionRepository';
import { validateUpdateTransactionStatus } from '../validators/transactionValidation';

export default abstract class UpdateTransactionUseCase {
	private static transactionRepository = transactionRepository;

	private static validateUpdateTransactionStatus =
		validateUpdateTransactionStatus;

	static async execute(
		status: string,
		transaction: DatabaseTransactionType,
		commitTransaction: boolean,
		transactionId: string,
		balance: number,
	) {
		const result = this.validateUpdateTransactionStatus({ status });
		if (result.error) throw new CustomError(result.error.message, 400);
		await this.transactionRepository.updateOneByFilterTrx(
			{ transactionId },
			{ ...result.value, balance },
			transaction,
			{
				commitTransaction,
			},
		);
	}
}

import { generateDbId } from '../../../database/utils';
import CustomError from '../../../errors/customError';
import { TransactionType } from '../model/Transaction';
import transactionRepository from '../repository/transactionRepository';
import { validateNewTransactionData } from '../validators/transactionValidation';

export default abstract class CreateTransactionUseCase {
	private static transactionRepository = transactionRepository;

	private static validateNewTransactionData = validateNewTransactionData;

	static async execute(transactionData: Partial<TransactionType>) {
		const result = this.validateNewTransactionData(transactionData);
		if (result.error) throw new CustomError(result.error.message, 400);
		result.value.id = generateDbId();
		await this.transactionRepository.createOne(result.value, {});
	}
}

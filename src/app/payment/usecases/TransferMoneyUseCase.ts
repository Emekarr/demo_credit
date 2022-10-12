import CustomError from '../../../errors/customError';
import { TransferMoneyType } from '../../../services/payments/type.payments';
import { validateTransferMoneyData } from '../validators/paymentValidation';
import transactionRepository from '../../transaction/repository/transactionRepository';
import { fetchWalletBalance } from '../utils';
import UpdateWalletUseCase from '../../wallet/usecases/UpdateWalletUseCase';
import CreateTransactionUseCase from '../../transaction/usecases/CreateTransactionUseCase';
import { Actions, PaymentTypes, Status } from '../constants.payment';
import generateId from '../../../utils/generateId';

export default abstract class TransferMoneyUseCase {
	private static validateTransferMoneyData = validateTransferMoneyData;

	private static transactionRepository = transactionRepository;

	private static fetchWalletBalance = fetchWalletBalance;

	private static UpdateWalletUseCase = UpdateWalletUseCase;

	private static CreateTransactionUseCase = CreateTransactionUseCase;

	static async execute(data: TransferMoneyType) {
		const result = this.validateTransferMoneyData(data);
		if (result.error) throw new CustomError(result.error.message, 400);
		const { id: senderWalletId, balance: senderWalletBalance } =
			await this.fetchWalletBalance(result.value.sender);
		if (senderWalletBalance < result.value.amount)
			throw new CustomError('insufficient funds', 400);
		const { id: recieverWalletId, balance: recieverWalletBalance } =
			await this.fetchWalletBalance(result.value.reciever);

		const trx = await this.transactionRepository.startTransaction();
		const transactionId = generateId('DC-INAPP-');
		const senderBalance = senderWalletBalance - result.value.amount;
		await this.UpdateWalletUseCase.execute(
			senderWalletId,
			senderBalance,
			trx,
			false,
		);
		await this.CreateTransactionUseCase.execute(
			{
				sentFrom: senderWalletId,
				sentTo: recieverWalletId,
				balance: senderBalance,
				transactionId,
				description: result.value.description,
				action: Actions.DEBIT,
				status: Status.SUCCESS,
				paymentType: PaymentTypes.IN_APP_PAYMENT,
				amount: result.value.amount.toString(),
			},
			trx,
			false,
		);

		await this.UpdateWalletUseCase.execute(
			recieverWalletId,
			recieverWalletBalance + result.value.amount,
			trx,
			false,
		);
		await this.CreateTransactionUseCase.execute(
			{
				sentFrom: senderWalletId,
				sentTo: recieverWalletId,
				balance: senderBalance,
				transactionId,
				description: result.value.description,
				action: Actions.DEBIT,
				status: Status.SUCCESS,
				paymentType: PaymentTypes.IN_APP_PAYMENT,
				amount: result.value.amount.toString(),
			},
			trx,
			true,
		);
	}
}

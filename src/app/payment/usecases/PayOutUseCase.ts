import CustomError from '../../../errors/customError';
import { PayoutType } from '../../../services/payments/type.payments';
import { validatePayOutData } from '../validators/paymentValidation';
import PaymentService from '../../../services/payments/PaymentService';
import { fetchWalletBalance } from '../utils';
import Emitter from '../../../event_emitter/emitter';
import events from '../../../event_emitter/events';
import { Actions, PaymentTypes, Status } from '../constants.payment';

export default abstract class PayOutUseCase {
	private static validatePayOutData = validatePayOutData;

	private static PaymentService = PaymentService;

	private static fetchWalletBalance = fetchWalletBalance;

	private static emitter = Emitter;

	private static events = events;

	static async execute(payload: PayoutType, userId: string) {
		const result = this.validatePayOutData(payload);
		if (result.error) throw new CustomError(result.error.message, 400);
		const { balance, id } = await this.fetchWalletBalance(userId);
		if (balance < result.value.amount)
			throw new CustomError('insufficient funds', 400);
		const successPayload = await this.PaymentService.initiatePayout(
			result.value,
		);
		if (!successPayload)
			throw new CustomError('could not complete transfer', 500);
		const newWalletBalance = balance - result.value.amount;
		this.emitter.emit(
			this.events.PAYMENT.PAYOUT_COMPLETED.EVENT,
			{
				sentFrom: id,
				sentTo: id,
				balance: newWalletBalance,
				transactionId: successPayload?.reference,
				description: successPayload.narration,
				action: Actions.DEBIT,
				status: Status.SUCCESS,
				paymentType: PaymentTypes.PAY_OUT,
				amount: result.value.amount.toString(),
			},
			newWalletBalance,
			id,
		);
	}
}

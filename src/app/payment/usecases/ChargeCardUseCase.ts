import generateId from '../../../utils/generateId';
import CustomError from '../../../errors/customError';
import PaymentService from '../../../services/payments/PaymentService';
import Emitter from '../../../event_emitter/emitter';
import events from '../../../event_emitter/events';
import { ChargeCardPayload } from '../../../services/payments/type.payments';
import { validateNewPaymentData } from '../validators/paymentValidation';
import { Actions, PaymentTypes, Status } from '../constants.payment';
import { TransactionType } from '../../transaction/model/Transaction';
import walletRepository from '../../wallet/repository/walletRepository';
import { fetchWalletBalance } from '../utils';

export default abstract class ChargeCardUseCase {
	private static paymentService = PaymentService;

	private static emitter = Emitter;

	private static events = events;

	private static validateNewPaymentData = validateNewPaymentData;

	private static fetchWalletBalance = fetchWalletBalance;

	private static walletRepository = walletRepository;

	static async execute(
		data: ChargeCardPayload,
		userId: string,
		description: string,
	) {
		data.txRef = generateId('DC-');
		delete (data as any).description;
		const result = this.validateNewPaymentData(data);
		if (result.error) throw new CustomError(result.error.message, 400);
		const response = await this.paymentService.chargeCard(data);
		if (!response) throw new CustomError('charge request failed', 500);
		const { balance, id } = await this.fetchWalletBalance(userId);
		const transaction = await this.walletRepository.startTransaction();
		this.emitter.emit(
			this.events.PAYMENT.TOPUP_PAYMENT.EVENT,
			{
				sentFrom: id,
				sentTo: id,
				transactionId: response,
				action: Actions.CREDIT,
				status: Status.PENDING,
				paymentType: PaymentTypes.CARD_PAYMENT,
				amount: result.value.amount.toString(),
				description,
				balance: balance + result.value.amount,
			} as TransactionType,
			transaction,
		);
		return response;
	}
}

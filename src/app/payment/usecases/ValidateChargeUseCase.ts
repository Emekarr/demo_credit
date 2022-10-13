import CustomError from '../../../errors/customError';
import PaymentService from '../../../services/payments/PaymentService';
import Emitter from '../../../event_emitter/emitter';
import events from '../../../event_emitter/events';
import { Status } from '../constants.payment';
import { fetchWalletBalance } from '../utils';
import transactionRepository from '../../transaction/repository/transactionRepository';

export default abstract class ValidateChargeUseCase {
	private static paymentService = PaymentService;

	private static emitter = Emitter;

	private static events = events;

	private static transactionRepository = transactionRepository;

	static async execute(otp: string, userId: string, transactionId: string) {
		if (!transactionId || !otp)
			throw new CustomError('id and otp are required fields', 400);
		const pendingTransaction = await this.transactionRepository.findOneByFilter(
			{ transactionId },
			{},
		);
		if (!pendingTransaction)
			throw new CustomError('transaction does not exist', 404);
		if (pendingTransaction.status !== Status.PENDING)
			throw new CustomError('transaction already validated', 400);
		const response = await this.paymentService.validateCharge(
			otp,
			pendingTransaction.transactionId,
		);
		const { id, balance } = await fetchWalletBalance(userId);
		if (!response)
			return this.emitter.emit(
				this.events.PAYMENT.PAYMENT_VALIDATED.EVENT,
				id,
				balance,
				Status.FAILURE,
				transactionId,
			);

		this.emitter.emit(
			this.events.PAYMENT.PAYMENT_VALIDATED.EVENT,
			id,
			balance + parseInt(pendingTransaction.amount, 10),
			Status.SUCCESS,
			transactionId,
		);
		return response;
	}
}

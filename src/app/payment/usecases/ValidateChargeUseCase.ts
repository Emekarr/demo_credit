import CustomError from '../../../errors/customError';
import PaymentService from '../../../services/payments/PaymentService';
import Emitter from '../../../event_emitter/emitter';
import events from '../../../event_emitter/events';
import { TransactionType } from '../../transaction/model/Transaction';
import { Actions, PaymentTypes, Status } from '../constants.payment';
import { fetchWalletBalance } from '../utils';
import UpdateWalletUseCase from '../../wallet/usecases/UpdateWalletUseCase';
import walletRepository from '../../wallet/repository/walletRepository';

export default abstract class ValidateChargeUseCase {
	private static paymentService = PaymentService;

	private static emitter = Emitter;

	private static events = events;

	private static fetchWalletBalance = fetchWalletBalance;

	private static walletRepository = walletRepository;

	static async execute(
		flwTrxId: string,
		otp: string,
		userId: string,
		description: string,
		amount: number,
	) {
		if (!flwTrxId || !otp)
			throw new CustomError('id and otp are required fields', 400);
		const response = await this.paymentService.validateCharge(otp, flwTrxId);
		const { balance, id } = await this.fetchWalletBalance(userId);
		if (!response)
			return this.emitter.emit(this.events.PAYMENT.TOPUP_PAYMENT.EVENT, {
				sentFrom: id,
				sentTo: id,
				transactionId: flwTrxId,
				action: Actions.CREDIT,
				status: Status.FAILURE,
				paymentType: PaymentTypes.CARD_PAYMENT,
				amount: amount.toString(),
				description,
				balance: balance + amount,
			} as TransactionType);

		const transaction = await this.walletRepository.startTransaction();
		await UpdateWalletUseCase.execute(id, balance + amount, transaction, true);
		this.emitter.emit(
			this.events.PAYMENT.TOPUP_PAYMENT.EVENT,
			{
				sentFrom: id,
				sentTo: id,
				transactionId: flwTrxId,
				action: Actions.CREDIT,
				status: Status.SUCCESS,
				paymentType: PaymentTypes.CARD_PAYMENT,
				amount: response.amount.toString(),
				description,
				balance: balance + amount,
			} as TransactionType,
			transaction,
		);
		return response;
	}
}

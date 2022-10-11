import generateId from '../../../utils/generateId';
import CustomError from '../../../errors/customError';
import PaymentService from '../../../services/payments/PaymentService';
import { ChargeCardPayload } from '../../../services/payments/type.payments';
import { validateNewPaymentData } from '../validators/paymentValidation';

export default abstract class ChargeCardUseCase {
	private static paymentService = PaymentService;

	private static validateNewPaymentData = validateNewPaymentData;

	static async execute(data: ChargeCardPayload) {
		data.txRef = generateId('DC-');
		const result = this.validateNewPaymentData(data);
		if (result.error) throw new CustomError(result.error.message, 400);
		const response = await this.paymentService.chargeCard(data);
		return response;
	}
}

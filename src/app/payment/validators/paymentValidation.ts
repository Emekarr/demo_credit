import Joi from 'joi';
import { ChargeCardPayload } from '../../../services/payments/type.payments';

export const validateNewPaymentData = (data: Partial<ChargeCardPayload>) => {
	return Joi.object({
		cardNumber: Joi.string().required(),
		cvv: Joi.string().length(3).required(),
		expiryMonth: Joi.string().length(2).required(),
		expiryYear: Joi.string().length(2).required(),
		amount: Joi.number().positive().max(9999999).required(),
		email: Joi.string().email().required(),
		txRef: Joi.string().required(),
		pin: Joi.string().length(4).required(),
	}).validate(data) as Joi.ValidationResult<ChargeCardPayload>;
};

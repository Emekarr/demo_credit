import Joi from 'joi';
import {
	ChargeCardPayload,
	PayoutType,
	TransferMoneyType,
} from '../../../services/payments/type.payments';

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

export const validateTransferMoneyData = (data: TransferMoneyType) => {
	return Joi.object({
		sender: Joi.string().required(),
		reciever: Joi.string().required(),
		description: Joi.string(),
		amount: Joi.number().positive().required(),
	}).validate(data) as Joi.ValidationResult<TransferMoneyType>;
};

export const validatePayOutData = (data: PayoutType) => {
	return Joi.object({
		bankId: Joi.string().required(),
		accountNumber: Joi.string().required(),
		narration: Joi.string().required(),
		amount: Joi.number().positive().required(),
	}).validate(data) as Joi.ValidationResult<PayoutType>;
};

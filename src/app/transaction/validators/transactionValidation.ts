import Joi from 'joi';
import { Actions, PaymentTypes, Status } from '../../payment/constants.payment';
import { TransactionType } from '../model/Transaction';

export const validateNewTransactionData = (data: Partial<TransactionType>) => {
	return Joi.object({
		sentFrom: Joi.string().required(),
		sentTo: Joi.string().required(),
		balance: Joi.number().required(),
		transactionId: Joi.string().required(),
		description: Joi.string().required(),
		action: Joi.string()
			.required()
			.equal(...Object.values(Actions)),
		status: Joi.string()
			.required()
			.equal(...Object.values(Status)),
		paymentType: Joi.string()
			.required()
			.equal(...Object.values(PaymentTypes)),
		amount: Joi.number().required(),
	}).validate(data) as Joi.ValidationResult<TransactionType>;
};

import Joi from 'joi';
import { WalletType } from '../models/Wallet';

export const validateNewWalletData = (data: WalletType) => {
	return Joi.object({
		id: Joi.string(),
		userId: Joi.string().required(),
		balance: Joi.number().equal(0),
	}).validate(data) as Joi.ValidationResult<WalletType>;
};

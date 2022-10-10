import Joi from 'joi';
import { CredentialsType } from '../type.auth';

export const validateCredentials = (data: CredentialsType) => {
	return Joi.object({
		username: Joi.string(),
		email: Joi.string().email(),
		password: Joi.string().required(),
	}).validate(data) as Joi.ValidationResult<CredentialsType>;
};

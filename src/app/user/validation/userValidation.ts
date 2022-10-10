import Joi from 'joi';
import { UserType } from '../models/User';

export const validateNewUserData = (data: UserType) => {
	return Joi.object({
		id: Joi.string(),
		username: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required(),
	}).validate(data) as Joi.ValidationResult<UserType>;
};

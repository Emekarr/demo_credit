import { NextFunction, Request, Response } from 'express';
import ServerResponse from '../utils/response';
import AuthTokensManager from '../authentication/tokens';
import contantsAuth from '../authentication/contants.auth';
import CustomError from '../errors/customError';
import { TokenGenPayload } from '../authentication/type.auth';

const AuthMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const tokenHeader = req.headers.authorization;
		if (typeof tokenHeader === 'undefined')
			return new ServerResponse(
				'an access token is required for this route',
			).respond(res, 401);
		const bearer = tokenHeader.split(' ')[1];
		const result = (await AuthTokensManager.verifyToken(
			bearer,
		)) as TokenGenPayload;
		if (result.type != contantsAuth.TOKEN_TYPE.ACCESS_TOKEN)
			return new ServerResponse('invalid access token used').respond(res, 401);
		req.user.email = result.email;
		req.user.id = result.userId;
		req.user.username = result.username;
		next();
	} catch (err) {
		console.log(err);
		next(new CustomError('access denied', 403));
	}
};

export default AuthMiddleware;

import { NextFunction, Request, Response } from 'express';
import contantsAuth from '../../authentication/contants.auth';
import AuthTokensManager from '../../authentication/tokens';
import ServerResponse from '../../utils/response';
import LoginUserUseCase from './usecases/LoginUserUseCase';

export default abstract class AuthenticationController {
	static async loginUser(req: Request, res: Response, next: NextFunction) {
		try {
			const credentials = req.body;
			const user = await LoginUserUseCase.execute(credentials);
			const accessToken = await AuthTokensManager.generateAccessToken({
				email: user.email,
				userId: user.id,
				username: user.username,
			});
			const refreshToken = await AuthTokensManager.generateRefreshToken({
				email: user.email,
				userId: user.id,
				username: user.username,
			});
			res.cookie(contantsAuth.TOKEN_TYPE.ACCESS_TOKEN, accessToken, {
				maxAge: parseInt(process.env.ACCESS_TOKEN_LIFE as string, 10),
			});
			res.cookie(contantsAuth.TOKEN_TYPE.REFRESH_TOKEN, refreshToken, {
				maxAge: parseInt(process.env.REFRESH_TOKEN_LIFE as string, 10),
			});
			new ServerResponse('login success', null, true).respond(res, 200);
		} catch (err) {
			next(err);
		}
	}
}

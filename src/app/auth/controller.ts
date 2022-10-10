import { NextFunction, Request, Response } from 'express';
import ServerResponse from '../../utils/response';
import LoginUserUseCase from './usecases/LoginUserUseCase';

export default abstract class AuthenticationController {
	static async loginUser(req: Request, res: Response, next: NextFunction) {
		try {
			const credentials = req.body;
			await LoginUserUseCase.execute(credentials);
			new ServerResponse('login success', null, true).respond(res, 200);
		} catch (err) {
			next(err);
		}
	}
}

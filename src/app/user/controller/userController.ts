import { NextFunction, Request, Response } from 'express';
import ServerResponse from '../../../utils/response';
import CreateNewUserUseCase from '../usecases/CreateNewUserUseCase';
import FetchProfileUseCase from '../usecases/FetchProfileUseCase';

export default abstract class UserController {
	static async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const user = await CreateNewUserUseCase.execute(payload);
			new ServerResponse('user created successfully', { user }, true).respond(
				res,
				201,
			);
		} catch (err) {
			next(err);
		}
	}

	static async fetchUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await FetchProfileUseCase.execute(req.user.id);
			new ServerResponse('profile fetched', user, true).respond(res, 200);
		} catch (err) {
			next(err);
		}
	}
}

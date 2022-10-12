import { NextFunction, Request, Response } from 'express';
import ServerResponse from '../../../utils/response';
import FetchWalletUseCase from '../usecases/FetchWalletBalanceUseCase';

export default abstract class WalletController {
	static async fetchWallet(req: Request, res: Response, next: NextFunction) {
		try {
			const wallet = await FetchWalletUseCase.execute(req.user.id);
			new ServerResponse('wallet info fetched', wallet, true).respond(res, 200);
		} catch (err) {
			next(err);
		}
	}
}

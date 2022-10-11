import { NextFunction, Request, Response } from 'express';
import { ChargeCardPayload } from '../../../services/payments/type.payments';
import ServerResponse from '../../../utils/response';
import ChargeCardUseCase from '../usecases/ChargeCardUseCase';

export default abstract class PaymentController {
	static async creditWalletCard(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const data: ChargeCardPayload = req.body;
			data.email = req.user.email;
			const flwTrxId = await ChargeCardUseCase.execute(data);
			new ServerResponse(
				'charge request made',
				{ transactionId: flwTrxId },
				true,
			).respond(res, 200);
		} catch (err) {
			next(err);
		}
	}
}

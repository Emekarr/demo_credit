import { NextFunction, Request, Response } from 'express';
import { ChargeCardPayload } from '../../../services/payments/type.payments';
import ServerResponse from '../../../utils/response';
import ChargeCardUseCase from '../usecases/ChargeCardUseCase';
import TransferMoneyUseCase from '../usecases/TransferMoneyUseCase';
import ValidateChargeUseCase from '../usecases/ValidateChargeUseCase';

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

	static async validateCharge(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const response = await ValidateChargeUseCase.execute(
				payload.id,
				payload.otp,
				req.user.id,
				payload.description,
				payload.amount,
			);
			if (!response)
				return new ServerResponse(
					'charge validation failed',
					null,
					false,
				).respond(res, 500);
			new ServerResponse('charge validated successfully', null, true).respond(
				res,
				200,
			);
			``;
		} catch (err) {
			next(err);
		}
	}

	static async executeInAppTransfer(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const payload = req.body;
			await TransferMoneyUseCase.execute(payload);
			new ServerResponse('money transfered successfully', null, true).respond(
				res,
				200,
			);
		} catch (err) {
			next(err);
		}
	}
}

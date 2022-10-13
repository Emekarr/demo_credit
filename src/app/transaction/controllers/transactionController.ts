import { NextFunction, Request, Response } from 'express';
import CustomError from '../../../errors/customError';
import ServerResponse from '../../../utils/response';
import { Status } from '../../payment/constants.payment';
import transactionRepository from '../repository/transactionRepository';

export default abstract class TransactionController {
	static async fetchTransactions(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { status } = req.query;
			if (Object.values(Status).indexOf(status as string) === -1)
				throw new CustomError('unsupported transaction status sent', 400);
			const transactions = await transactionRepository.findManyByFilter(
				{
					status: status as string,
				},
				{},
			);
			new ServerResponse('transactions fetched', transactions, true).respond(
				res,
				200,
			);
		} catch (err) {
			next(err);
		}
	}
}

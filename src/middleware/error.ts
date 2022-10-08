import { Response, Request, NextFunction } from 'express';

import CustomError from '../errors/customError';
import ServerResponse from '../utils/response';

const errNames = ['CastError', 'SyntaxError'];

const ErrorMiddleware = (
	err: Error | CustomError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.log('AN ERROR OCCURED!');
	console.log(`ERROR MESSAGE: ${err.message}\n ERROR_NAME: ${err.name}`);
	console.log(err);
	if (err.name === 'CustomError') {
		new ServerResponse(`${err.message}`, null, false).respond(
			res,
			(err as CustomError).errorCode,
		);
	} else if (errNames.includes(err.name)) {
		new ServerResponse(`${err.message}`, null, false).respond(res, 400);
	} else {
		new ServerResponse(`${err.message}`, null, false).respond(res, 500);
	}
};

export default ErrorMiddleware;

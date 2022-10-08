import express, { Application, Response, Request } from 'express';
import cors from 'cors';

// utils
import ServerResponse from './utils/response';

// middlewares
import ErrorMiddleware from './middleware/error';

// startups
import('./startups/index').then((startup) => {
	startup.default();
});

class App {
	private express: Application;

	constructor() {
		this.express = express();

		this.express.use(
			cors({
				origin: (process.env.CLIENT_URL as string).split(' '),
				credentials: true,
				methods: 'GET, POST',
				preflightContinue: true,
			}),
		);

		this.express.use(express.json({ limit: process.env.JSON_LIMIT }));
		this.express.use(
			express.urlencoded({ extended: true, limit: process.env.JSON_LIMIT }),
		);

		this.express.use('*', (req: Request, res: Response) => {
			new ServerResponse(
				`the route ${req.method} ${req.originalUrl} does not exist.`,
			).respond(res, 404);
		});

		this.express.use(ErrorMiddleware);
	}

	listen(port: string, cb: () => void) {
		this.express.listen(port, cb);
	}
}

export default new App();

declare namespace Express {
	interface Request {
		user: { id: string; email: string; username: string };
	}
}
declare module 'flutterwave-node-v3';
declare module 'uniqid';

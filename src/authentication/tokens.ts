import jwt from 'jsonwebtoken';
import Constants from './contants.auth';
import { TokenGenPayload } from './type.auth';

export default abstract class AuthTokensManager {
	private static jwt = jwt;

	private static constants = Constants;
	static async generateAccessToken(paylaod: Partial<TokenGenPayload>) {
		paylaod.type = this.constants.TOKEN_TYPE.ACCESS_TOKEN;
		return this.generateTokens(
			paylaod as TokenGenPayload,
			parseInt(process.env.ACCESS_TOKEN_LIFE as string, 10), // expires in 10 mins
		);
	}

	static async generateRefreshToken(paylaod: Partial<TokenGenPayload>) {
		paylaod.type = this.constants.TOKEN_TYPE.REFRESH_TOKEN;
		return this.generateTokens(
			paylaod as TokenGenPayload,
			parseInt(process.env.REFRESH_TOKEN_LIFE as string, 10), // expires in 30 days
		);
	}

	private static async generateTokens(
		paylaod: TokenGenPayload,
		expiresIn: number,
	) {
		return this.jwt.sign(paylaod, process.env.JWT_SECRET as string, {
			expiresIn,
		});
	}

	static async verifyToken(token: string) {
		return this.jwt.verify(token, process.env.JWT_SECRET as string);
	}
}

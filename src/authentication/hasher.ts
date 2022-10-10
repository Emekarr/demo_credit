const bcrypt = require('bcrypt');

export default abstract class Hasher {
	private static hasher = bcrypt;

	private static saltRounds = 10;

	static async hashPassword(password: string): Promise<string> {
		return await this.hasher.hash(password, await this._genSalt());
	}

	static async verifyPassword(
		password: string,
		hash: string,
	): Promise<boolean> {
		return await this.hasher.compare(password, hash);
	}

	private static async _genSalt() {
		return await this.hasher.genSalt(this.saltRounds);
	}
}

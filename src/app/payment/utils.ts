import walletRepository from '../wallet/repository/walletRepository';

export const fetchWalletBalance = async (userId: string) => {
	const wallet = await walletRepository.findOneByFilter(
		{ userId },
		{ selectedFields: ['balance', 'id'] },
	);
	return { balance: wallet.balance, id: wallet.id };
};

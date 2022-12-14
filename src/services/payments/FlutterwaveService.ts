import Flutterwave from 'flutterwave-node-v3';
import generateId from '../../utils/generateId';
import {
	ChargeCardPayload,
	PaymentType,
	PayoutSuccessType,
	PayoutType,
	ValidateChargeResponse,
} from './type.payments';

export default class FlutterwaveService implements PaymentType {
	private flw;

	constructor() {
		this.flw = new Flutterwave(process.env.FLW_PUB, process.env.FLW_SEC);
	}

	async chargeCard(data: ChargeCardPayload): Promise<string | null> {
		let flwRef!: string | null;

		const payload = {
			card_number: data.cardNumber,
			cvv: data.cvv,
			expiry_month: data.expiryMonth,
			expiry_year: data.expiryYear,
			currency: 'NGN',
			amount: data.amount,
			email: data.email,
			enckey: process.env.FLW_ENC_KEY as string,
			tx_ref: data.txRef,
		};

		try {
			//  charge the users card
			const response = await this.flw.Charge.card(payload);
			if (response.meta.authorization.mode === 'pin') {
				const payload2 = {
					...payload,
					authorization: {
						mode: 'pin',
						fields: ['pin'],
						pin: data.pin,
					},
				};
				const reCallCharge = await this.flw.Charge.card(payload2);
				flwRef = reCallCharge.data.flw_ref;
			}
		} catch (err) {
			console.log('alert dev team through sentry and log error');
			flwRef = null;
		}
		return flwRef;
	}

	// validate the charge request
	async validateCharge(
		otp: string,
		flwRef: string,
	): Promise<ValidateChargeResponse | null> {
		let data!: ValidateChargeResponse | null;
		try {
			const callValidate = await this.flw.Charge.validate({
				otp,
				flw_ref: flwRef,
			});
			data = {
				status: callValidate.status,
				amount: callValidate.data.amount,
				paymentType: callValidate.data.payment_type,
				txRef: callValidate.data.tx_ref,
				id: callValidate.data.id,
			};
		} catch (err) {
			console.log('alert dev team through sentry and log error');
			data = null;
		}
		return data;
	}

	async verifyTransaction(id: string): Promise<string | null> {
		let transactionToken: string | null;
		try {
			const payload = { id };
			const response = await this.flw.Transaction.verify(payload);
			transactionToken = response.data.card.token;
		} catch (err) {
			console.log('alert dev team through sentry and log error');
			transactionToken = null;
		}
		return transactionToken;
	}

	async initiatePayout(payload: PayoutType): Promise<PayoutSuccessType | null> {
		try {
			const response = await this.flw.Transfer.initiate({
				...payload,
				debit_currency: 'NGN',
				reference: generateId('DC-REF-'),
				currency: 'NGN',
				account_bank: payload.bankId, //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
				account_number: payload.accountNumber,
			});
			return {
				...response.data,
				accountNumber: response.data.account_number,
				fullName: response.data.full_name,
				createdAt: response.data.created_at,
				bankName: response.data.bank_name,
			};
		} catch (err) {
			console.log('alert dev team through sentry and log error');
			return null;
		}
	}
}

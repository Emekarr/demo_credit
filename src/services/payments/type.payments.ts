export interface PaymentType {
	chargeCard: (data: ChargeCardPayload) => Promise<string | null>;
	validateCharge: (
		otp: string,
		flwRef: string,
	) => Promise<ValidateChargeResponse | null>;
	verifyTransaction: (id: string) => Promise<string | null>;
	initiatePayout: (payload: PayoutType) => Promise<any>;
}

export interface ValidateChargeResponse {
	status: string;
	amount: number;
	paymentType: string;
	txRef: string;
	id: string;
}

export interface ChargeCardPayload {
	cardNumber: string;
	cvv: string;
	expiryMonth: string;
	expiryYear: string;
	amount: number;
	email: string;
	txRef: string;
	pin: number;
}

export interface TransferMoneyType {
	sender: string;
	reciever: string;
	amount: number;
	description: string;
}

export interface PayoutType {
	bankId: string;
	accountNumber: string;
	narration: string;
	amount: number;
}

export interface PayoutSuccessType {
	accountNumber: string;
	fullName: string;
	createdAt: string;
	currency: string;
	reference: string;
	bankName: string;
	narration: string;
}

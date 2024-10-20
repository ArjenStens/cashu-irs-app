import type { Proof, PaymentRequest } from '@cashu/cashu-ts';

export type RawLineItem = {
	/** Item name */
	n: string;
	/** Item image (optional) */
	i?: string;
	/** Price of the item */
	p: number;
};

export type RawPayment = {
	/** The indexes of line items the payment is for. Must be in acceding order */
	i: number[];
	/** The amount of money paid */
	a: number;
	/** Payment proofs (cashu proofs) */
	// p?: Proof[];
	/** Optional Comment */
	c?: string;
};

// Parsed types
export type LineItem = {
	/** Name of the item */
	name: string;
	/** Price of the item */
	price: number;
	/** Optional image */
	image?: string;
	/** The applied payments */
	payments: Payment[];
	/** The amount paid so far */
	paid: number;
};
export type Payment = {
	indexes: number[];
	/** The line items this payment is applied */
	lineItems: LineItem[];
	/** The amount of the payment */
	amount: number;
	/** The Cashu tokens */
	// proofs: Proof[];
	/** Human readable comment */
	comment?: string;
};

/** Parsed from the NFC card */
export type Receipt = {
	/** The cashu payment request for the receipt */
	paymentRequest: PaymentRequest;
	/** Bech32 encoded line items */
	rawLineItems: string;
	/** Receipt line items */
	lineItems: LineItem[];
	/** The current state of the settlement */
	payments: Payment[];
};

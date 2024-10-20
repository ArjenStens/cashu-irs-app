import { bech32 } from '@scure/base';
import type { LineItem, Payment, RawLineItem, RawPayment, Receipt } from './types';
import { PaymentRequest } from '@cashu/cashu-ts';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function decodeLineItems(encoded: string) {
	const words = bech32.decode(encoded as `${string}1${string}`);
	if (words.prefix !== 'bill') throw new Error('Incorrect prefix');
	const uint = bech32.fromWords(words.words);
	return JSON.parse(decoder.decode(uint)) as RawLineItem[];
}
export function encodeLineItems(bill: RawLineItem[]) {
	return bech32.encode('bill', bech32.toWords(encoder.encode(JSON.stringify(bill))));
}

export function decodePayment(encoded: string) {
	const words = bech32.decode(encoded as `${string}1${string}`);
	if (words.prefix !== 'pay') throw new Error('Incorrect prefix');
	const uint = bech32.fromWords(words.words);
	return JSON.parse(decoder.decode(uint)) as RawPayment;
}
export function encodePayment(payment: RawPayment) {
	return bech32.encode('payment', bech32.toWords(encoder.encode(JSON.stringify(payment))));
}

/** Decodes a receipt from an array of strings */
export function decodeRecords(...records: string[]): Receipt {
	const [paymentRequestRecord, lineItemsRecord, ...paymentRecords] = records;

	if (!paymentRequestRecord) throw new Error('Missing payment request record');
	const paymentRequest = PaymentRequest.fromEncodedRequest(paymentRequestRecord);

	const rawLineItems = decodeLineItems(lineItemsRecord);
	const rawPayments = paymentRecords.map(decodePayment);

	const lineItems: LineItem[] = rawLineItems.map((item) => ({
		name: item.n,
		image: item.i,
		price: item.p,
		payments: [],
		paid: 0
	}));
	const payments: Payment[] = rawPayments.map((item) => ({
		amount: item.a,
		comment: item.c,
		indexes: item.i,
		lineItems: []
	}));

	for (let i = 0; i < payments.length; i++) {
		const payment = payments[i];

		for (const idx of payment.indexes) {
			const lineItem = lineItems[idx];
			if (!lineItem) throw new Error('Failed to find line item');

			lineItem.paid += payment.amount;
			lineItem.payments.push(payment);
		}
	}

	return { paymentRequest, lineItems, payments, rawLineItems: lineItemsRecord };
}

/** Encodes a receipt to an array of strings */
export function encodeRecords(receipt: Receipt) {
	const rawLineItems: RawLineItem[] = receipt.lineItems.map((item) => ({
		n: item.name,
		i: item.image,
		p: item.price
	}));
	const rawPayments: RawPayment[] = receipt.payments.map((item) => ({
		i: item.indexes,
		a: item.amount,
		c: item.comment
	}));

	return [
		receipt.paymentRequest.toEncodedRequest(),
		encodeLineItems(rawLineItems),
		...rawPayments.map(encodePayment)
	];
}

type LineItem = {
	n: string; // name
	i?: string; // image
	a: number; // amount
};

type Payment = {
	i: number[]; // idx
	a: number; // amount
	p?: string; // payment proofs
};

// parsed from nfc
type Receipt = {
	payment: string;
	lineItems: LineItem[];
	payments: Payment[];
};

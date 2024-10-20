import { browser } from '$app/environment';
import { debounce } from './debounce';

export function scan(cancel?: AbortSignal) {
	if (browser) {
		if (!('NDEFReader' in window)) throw new Error('NFC scanning not supported in this browser');
	} else throw new Error('Not Browser');

	let resolved = false;
	const decoder = new TextDecoder();
	const reading = new AbortController();
	const reader = new NDEFReader();

	const close = debounce(() => {
		console.log('Stopping scan');
		reading.abort();
	}, 10000);

	return new Promise<string[]>((res, rej) => {
		cancel?.addEventListener('abort', () => {
			console.log('Scanning canceled');
			reading.abort();
			rej(new Error('User Aborted'));
		});

		// start scanning
		reader.scan({ signal: reading.signal }).then(() => {
			console.log('Stared Scanning...');

			reader.onreadingerror = () => {
				console.log('Cannot read data from the NFC tag. Try another one?');
			};

			reader.onreading = (event) => {
				console.log('Scanned');
				if (!resolved) {
					resolved = true;
					const records: string[] = [];
					for (const record of event.message.records) {
						const text = decoder.decode(record.data);
						records.push(text);
					}

					res(records);
				}

				// call the close debounce
				close();
			};
		});
	});
}

<script lang="ts">
	import { browser } from '$app/environment';

	let ndefReader: NDEFReader;
	var decoder = new TextDecoder(); // always utf-8

	if (browser) {
		if(!('NDEFReader' in window)){
			console.log('NFC scanning not supported in this browser');
		}

		ndefReader = new NDEFReader();
	} else{
		console.log('not browser');
	}

	function scanCard(): string[] {
		let records: string[] = [];

		console.log('ScanCard');
		const reading = new AbortController();
		ndefReader.scan({signal: reading.signal}).then(() => {
			console.log("Scan started successfully.");
			ndefReader.onreadingerror = () => {
				console.log("Cannot read data from the NFC tag. Try another one?");
			};
			ndefReader.onreading = event => {
				event.message.records.forEach(record => {
					const text = decoder.decode(record.data);
					records.push(text);
					console.log(record);
				})
				// reading.abort();
			};
		}).catch(error => {
			console.log(`Error! Scan failed to start: ${error}.`);
		});

		return records;
	}



	let lastScan: string[] = []


</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>Scan NFC</h1>

	<p>
		Please bring the receipt close to your phone to scan it!
	</p>


	<button on:click={scanCard} >Scan Receipt</button>

	{#each lastScan as record}
		<p>{record}</p>
	{/each}
</div>

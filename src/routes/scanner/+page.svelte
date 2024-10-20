<script lang="ts">
	import { scan } from '../../helpers/scanner';
	import { decodeRecords } from '../../irs';
	import type { Receipt } from '../../irs/types';

	let lastScan: string[] = [];
	let receipt: Receipt | null = null;

	function scanCard() {
		scan()
			.then((records) => {
				console.log(records);
				lastScan = records;

				try {
					receipt = decodeRecords(...records);
				} catch (error) {
					if (error instanceof Error) alert(error.message);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>Scan NFC</h1>

	<p>Please bring the receipt close to your phone to scan it!</p>

	<button on:click={scanCard}>Scan Receipt</button>

	{#each lastScan as record}
		<p>{record}</p>
	{/each}

	{#if receipt}
		<pre style="white-space: pre;">{JSON.stringify(receipt)}</pre>
	{/if}
</div>

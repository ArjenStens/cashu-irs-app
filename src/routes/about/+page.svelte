<script lang="ts">
	import { scan } from '../../helpers/scanner';

	function scanCard(): string[] {
		let records: string[] = [];

		scan()
			.then((records) => {
				console.log(records);
			})
			.catch((err) => {
				console.log(err);
			});

		return records;
	}

	let lastScan: string[] = [];
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
</div>

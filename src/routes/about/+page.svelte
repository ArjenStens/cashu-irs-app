<script lang="ts">
	const ndef = new NDEFReader();
	ndef.scan().then(() => {
		console.log("Scan started successfully.");
		ndef.onreadingerror = () => {
			console.log("Cannot read data from the NFC tag. Try another one?");
		};
		ndef.onreading = event => {
			console.log("NDEF message read.");
		};
	}).catch(error => {
		console.log(`Error! Scan failed to start: ${error}.`);
	});
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>Scan NFC</h1>

	<p>
		This is a <a href="https://kit.svelte.dev">SvelteKit</a> app. You can make your own by typing the
		following into your command line and following the prompts:
	</p>

	<pre>npm create svelte@latest</pre>

	<p>
		The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading.
	</p>
</div>

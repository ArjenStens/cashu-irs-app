<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<div class="min-h-screen bg-gray-100">
	<Header />

	<!-- Main Content -->
	<main class="pt-16 pb-20 px-4">
		<slot />
	</main>
</div>

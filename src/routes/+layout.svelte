<script>
	import Header from './Header.svelte';
	import '../app.css';

	export const prerender = true;
</script>

<div class="min-h-screen bg-gray-100">
	<Header />

	<!-- Main Content -->
	<main class="pt-16 pb-20 px-4">
		<slot />
	</main>

	<!-- Bottom Navigation -->
	<nav class="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-10">
		<div class="flex justify-around">
			<a href="/" class="flex flex-col items-center py-2 px-4 text-blue-500">
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					></path></svg
				>
				<span class="text-xs mt-1">Home</span>
			</a>
			<a href="/about" class="flex flex-col items-center py-2 px-4 text-gray-500">
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					></path></svg
				>
				<span class="text-xs mt-1">Search</span>
			</a>
			<a href="#" class="flex flex-col items-center py-2 px-4 text-gray-500">
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
					></path></svg
				>
				<span class="text-xs mt-1">Profile</span>
			</a>
		</div>
	</nav>
</div>

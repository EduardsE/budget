<script lang="ts">
	import Counter from '$lib/Counter.svelte';
	import http from '$lib/http';
	import { onMount } from 'svelte';

	onMount(async () => {
		const res = await http('transaction');
		console.log(res);
	});
</script>

<main>
	<h1>Hello world!</h1>
	<a href="/transactions">Transactions</a>1

	<Counter />

	<p>
		Visit <a class="text-blue-600 underline" href="https://svelte.dev">svelte.dev</a> to learn how to
		build Svelte apps.
	</p>
</main>

<style lang="scss">
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	main {
		@apply text-center;
		@apply p-4;
		@apply mx-auto;
	}

	h1 {
		@apply text-red-600;
		@apply uppercase;
		@apply text-6xl;
		@apply font-thin;
		@apply leading-tight;
		@apply my-16 mx-auto;
		@apply max-w-xs;
	}

	p {
		@apply max-w-xs;
		@apply my-8 mx-auto;
		@apply leading-snug;
	}

	@screen sm {
		h1 {
			@apply max-w-none;
		}

		p {
			@apply max-w-none;
		}
	}
</style>

<script lang="ts">
	import FilterDrawer from '$lib/components/FilterDrawer.svelte';

	let filterOpen = $state(false);
</script>

<nav>
	<a href="/"> <img src="./hangar.svg" alt="homepage" /></a>
	<button class="filter-toggle" onclick={() => (filterOpen = !filterOpen)}>
		Filters
	</button>
	<p>
		<a href="mailto:wonderbot@space-shift.com">contact</a> ||
		<a href="https://github.com/dj0le">github</a>
	</p>
</nav>
<FilterDrawer open={filterOpen} />

<style>
	.filter-toggle {
		color: var(--surface-4);
		background-color: var(--surface-1);
		border: 2px solid var(--surface-4);
		border-radius: var(--radius-3);
		font-family: var(--font-title);
		font-weight: var(--font-weight-bold);
		font-size: 1rem;
		padding: 6px 24px;
		cursor: pointer;
		transition: all ease-out 0.2s;
	}

	.filter-toggle:hover {
		color: var(--surface-1);
		background: var(--surface-4);
		border: 2px solid var(--surface-1);
	}
</style>

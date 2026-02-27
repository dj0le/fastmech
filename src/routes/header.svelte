<script lang="ts">
	import FilterDrawer from '$lib/components/FilterDrawer.svelte';
	import { getActiveFilterCount } from '$lib/mech-state.svelte';

	let filterOpen = $state(false);
	const activeCount = $derived(getActiveFilterCount());

	function closeDrawer() {
		filterOpen = false;
	}
</script>

<svelte:window
	onclick={(e) => {
		if (filterOpen && (e.target as HTMLElement).closest('a[href^="details/"]')) {
			filterOpen = false;
		}
	}}
/>

<div class="header-wrapper">
	<nav>
		<a href="/"> <img src="./hangar.svg" alt="homepage" /></a>
		<button class="filter-toggle" onclick={() => (filterOpen = !filterOpen)}>
			Filters{#if activeCount > 0}{' '}({activeCount}){/if}
		</button>
		<p>
			<a href="mailto:wonderbot@space-shift.com">contact</a> ||
			<a href="https://github.com/dj0le">github</a>
		</p>
	</nav>
	<FilterDrawer open={filterOpen} />
</div>

<style>
	.header-wrapper {
		position: relative;
	}

	.filter-toggle {
		color: var(--surface-4);
		background-color: var(--surface-1);
		border: 2px solid var(--surface-4);
		border-radius: 6px;
		font-family: var(--font-title);
		font-weight: var(--font-weight-bold);
		font-size: 1rem;
		padding: 6px 32px;
		cursor: pointer;
		transition: all ease-out 0.2s;
	}

	.filter-toggle:hover {
		color: var(--surface-1);
		background: var(--surface-4);
		border: 2px solid var(--surface-1);
	}
</style>

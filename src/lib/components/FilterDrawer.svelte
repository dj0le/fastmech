<script lang="ts">
	import { filters, getFilterOptions, getFilteredMechs, clearFilters } from '$lib/mech-state.svelte';

	const filterOptions = $derived(getFilterOptions());
	const filteredMechs = $derived(getFilteredMechs());

	let { open }: { open: boolean } = $props();
</script>

<div class="drawer-wrapper" class:open>
	<div class="drawer-content">
		<div class="filter-row">
			<input type="text" bind:value={filters.search} placeholder="Search chassis..." />
			<select bind:value={filters.weightClass}>
				<option value="">Weight Class</option>
				{#each filterOptions.weightClass as opt}
					<option value={opt}>{opt}</option>
				{/each}
			</select>
			<select bind:value={filters.role}>
				<option value="">Role</option>
				{#each filterOptions.role as opt}
					<option value={opt}>{opt}</option>
				{/each}
			</select>
			<select bind:value={filters.origin}>
				<option value="">Origin</option>
				{#each filterOptions.origin as opt}
					<option value={opt}>{opt}</option>
				{/each}
			</select>
			<select bind:value={filters.structureType}>
				<option value="">Structure</option>
				{#each filterOptions.structureType as opt}
					<option value={opt}>{opt}</option>
				{/each}
			</select>
			<div class="row-end">
				<span class="result-count">{filteredMechs.length} mechs</span>
				<button class="clear-btn" onclick={clearFilters}>Clear</button>
			</div>
		</div>
	</div>
</div>

<style>
	.drawer-wrapper {
		position: absolute;
		left: 0;
		right: 0;
		z-index: 10;
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.3s ease;
	}

	.drawer-wrapper.open {
		grid-template-rows: 1fr;
	}

	.drawer-content {
		overflow: hidden;
	}

	.filter-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px;
		padding: 8px;
		margin-top: 6px;
	}

	input,
	select {
		background: var(--surface-1);
		color: var(--text-1);
		border: 2px solid var(--surface-4);
		border-radius: 6px;
		padding: 4px 8px;
		font-family: var(--font-body);
		font-size: 0.875rem;
		height: 32px;
		flex: 1 1 120px;
	}

	input::placeholder {
		color: var(--surface-4);
	}

	.row-end {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-left: auto;
	}

	.result-count {
		font-family: var(--font-title);
		color: var(--text-1);
		font-size: 0.875rem;
		white-space: nowrap;
		padding: 4px 16px;
	}

	.clear-btn {
		background: var(--surface-1);
		color: var(--surface-4);
		border: 2px solid var(--surface-4);
		border-radius: 6px;
		padding: 4px 16px;
		font-family: var(--font-title);
		font-size: 0.875rem;
		height: 32px;
		cursor: pointer;
		transition: all ease-out 0.2s;
		white-space: nowrap;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.clear-btn:hover {
		color: var(--surface-1);
		background: var(--surface-4);
		border: 2px solid var(--surface-1);
	}
</style>

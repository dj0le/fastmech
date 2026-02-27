<script lang="ts">
	import { filters, getFilterOptions, getFilteredMechs, clearFilters } from '$lib/mech-state.svelte';

	const filterOptions = $derived(getFilterOptions());
	const filteredMechs = $derived(getFilteredMechs());

	let { open }: { open: boolean } = $props();
</script>

{#if open}
	<div class="drawer">
		<div class="filter-row">
			<label class="filter-group">
				<span class="label">Search</span>
				<input type="text" bind:value={filters.search} placeholder="Chassis name..." />
			</label>

			<label class="filter-group">
				<span class="label">Weight Class</span>
				<select bind:value={filters.weightClass}>
					<option value="">All</option>
					{#each filterOptions.weightClass as opt}
						<option value={opt}>{opt}</option>
					{/each}
				</select>
			</label>

			<label class="filter-group">
				<span class="label">Role</span>
				<select bind:value={filters.role}>
					<option value="">All</option>
					{#each filterOptions.role as opt}
						<option value={opt}>{opt}</option>
					{/each}
				</select>
			</label>

			<label class="filter-group">
				<span class="label">Origin</span>
				<select bind:value={filters.origin}>
					<option value="">All</option>
					{#each filterOptions.origin as opt}
						<option value={opt}>{opt}</option>
					{/each}
				</select>
			</label>

			<label class="filter-group">
				<span class="label">Structure</span>
				<select bind:value={filters.structureType}>
					<option value="">All</option>
					{#each filterOptions.structureType as opt}
						<option value={opt}>{opt}</option>
					{/each}
				</select>
			</label>
		</div>

		<div class="drawer-footer">
			<span class="result-count">{filteredMechs.length} mechs</span>
			<button class="clear-btn" onclick={clearFilters}>Clear Filters</button>
		</div>
	</div>
{/if}

<style>
	.drawer {
		background: var(--surface-3);
		border: 2px solid var(--surface-4);
		border-radius: var(--radius-3);
		padding: 16px;
		margin-top: 8px;
	}

	.filter-row {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1 1 150px;
	}

	.label {
		font-family: var(--font-title);
		font-size: 0.875rem;
		color: var(--text-3);
	}

	input,
	select {
		background: var(--surface-1);
		color: var(--text-1);
		border: 2px solid var(--surface-4);
		border-radius: var(--radius-2);
		padding: 8px 10px;
		font-family: var(--font-body);
		font-size: 0.9rem;
	}

	input::placeholder {
		color: var(--surface-4);
	}

	.drawer-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 12px;
	}

	.result-count {
		font-family: var(--font-title);
		color: var(--text-3);
		font-size: 0.9rem;
	}

	.clear-btn {
		background: var(--surface-4);
		color: var(--text-3);
		border: 2px solid var(--surface-4);
		border-radius: var(--radius-2);
		padding: 6px 16px;
		font-family: var(--font-title);
		font-size: 0.875rem;
		cursor: pointer;
		transition: all ease-out 0.2s;
	}

	.clear-btn:hover {
		background: var(--text-3);
		color: var(--surface-4);
	}
</style>

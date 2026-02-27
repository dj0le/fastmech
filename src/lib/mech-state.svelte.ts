import type { Mech, FilterState } from '$lib/types';

const WEIGHT_ORDER = ['Light', 'Medium', 'Heavy', 'Assault'];

let allMechs: Mech[] = $state([]);

export function getAllMechs() {
	return allMechs;
}

export function setAllMechs(mechs: Mech[]) {
	allMechs = mechs;
}

export let filters: FilterState = $state({
	search: '',
	weightClass: '',
	role: '',
	origin: '',
	structureType: ''
});

const _filteredMechs: Mech[] = $derived.by(() => {
	return allMechs.filter((m) => {
		if (filters.search && !m.chassis.toLowerCase().includes(filters.search.toLowerCase())) {
			return false;
		}
		if (filters.weightClass && m.weightClass !== filters.weightClass) return false;
		if (filters.role && m.role !== filters.role) return false;
		if (filters.origin && m.origin !== filters.origin) return false;
		if (filters.structureType && m.structureType !== filters.structureType) return false;
		return true;
	});
});

export function getFilteredMechs() {
	return _filteredMechs;
}

function mechsExcluding(field: keyof FilterState) {
	return allMechs.filter((m) => {
		if (field !== 'search' && filters.search && !m.chassis.toLowerCase().includes(filters.search.toLowerCase())) return false;
		if (field !== 'weightClass' && filters.weightClass && m.weightClass !== filters.weightClass) return false;
		if (field !== 'role' && filters.role && m.role !== filters.role) return false;
		if (field !== 'origin' && filters.origin && m.origin !== filters.origin) return false;
		if (field !== 'structureType' && filters.structureType && m.structureType !== filters.structureType) return false;
		return true;
	});
}

const _filterOptions = $derived.by(() => {
	const unique = (arr: string[]) => [...new Set(arr)].sort();
	return {
		weightClass: unique(mechsExcluding('weightClass').map((m) => m.weightClass))
			.sort((a, b) => WEIGHT_ORDER.indexOf(a) - WEIGHT_ORDER.indexOf(b)),
		role: unique(mechsExcluding('role').map((m) => m.role)),
		origin: unique(mechsExcluding('origin').map((m) => m.origin)),
		structureType: unique(mechsExcluding('structureType').map((m) => m.structureType))
	};
});

export function getFilterOptions() {
	return _filterOptions;
}

const _activeFilterCount = $derived(
	[filters.search, filters.weightClass, filters.role, filters.origin, filters.structureType]
		.filter(Boolean).length
);

export function getActiveFilterCount() {
	return _activeFilterCount;
}

export function clearFilters() {
	filters.search = '';
	filters.weightClass = '';
	filters.role = '';
	filters.origin = '';
	filters.structureType = '';
}

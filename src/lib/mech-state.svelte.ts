import type { Mech, FilterState } from '$lib/types';

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

const _filterOptions = $derived.by(() => {
	const unique = (arr: string[]) => [...new Set(arr)].sort();
	return {
		weightClass: unique(allMechs.map((m) => m.weightClass)),
		role: unique(allMechs.map((m) => m.role)),
		origin: unique(allMechs.map((m) => m.origin)),
		structureType: unique(allMechs.map((m) => m.structureType))
	};
});

export function getFilterOptions() {
	return _filterOptions;
}

export function clearFilters() {
	filters.search = '';
	filters.weightClass = '';
	filters.role = '';
	filters.origin = '';
	filters.structureType = '';
}

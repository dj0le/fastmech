export interface Mech {
	id: number;
	shortName: string;
	chassis: string;
	weightClass: string;
	role: string;
	weight: number;
	year: number;
	cost: number;
	bv: number;
	origin: string;
	armorType: string;
	externalArmor: number;
	internalArmor: number;
	structureType: string;
	engine: string;
	heatCapacity: number;
	heatSinks: number;
	fullsize: string;
}

export interface MechShort {
	id: number;
	chassis: string;
	weightClass: string;
	role: number;
	thumbnail: string;
}

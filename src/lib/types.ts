export interface Mech {
	id: number;
	chassis: string;
	model: string;
	weightClass: string;
	weight: number;
	year: number;
	cost: number;
	bv: number;
	isClan: string;
	armorType: string;
	totalExternalArmor: number;
	totalInternalArmor: number;
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
	year: number;
	thumbnail: string;
}

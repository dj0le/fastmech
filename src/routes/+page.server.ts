async function getMechs() {
	const response = await fetch('https://po4cwo4.thockyspace.com/');
	return response.json();
}

export async function load() {
	return {
		mechs: await getMechs()
	};
}

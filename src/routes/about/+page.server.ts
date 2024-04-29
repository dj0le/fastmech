async function getMechs() {
	const response = await fetch('http://127.0.0.1:8000/mechs/');
	return response.json();
}

export async function load() {
	return {
		mechs: await getMechs()
	};
}

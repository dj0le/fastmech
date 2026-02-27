import { API_URL } from '$env/static/private';

async function getMechs() {
	const response = await fetch(`${API_URL}/`);
	return response.json();
}

export async function load() {
	return {
		mechs: await getMechs()
	};
}

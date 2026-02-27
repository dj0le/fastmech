import { env } from '$env/dynamic/private';

async function getMechs() {
	const response = await fetch(`${env.API_URL}/`);
	return response.json();
}

export async function load() {
	return {
		mechs: await getMechs()
	};
}

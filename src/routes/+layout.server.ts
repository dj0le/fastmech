import { env } from '$env/dynamic/private';

export async function load() {
	const response = await fetch(`${env.API_URL}/`);
	return { mechs: await response.json() };
}

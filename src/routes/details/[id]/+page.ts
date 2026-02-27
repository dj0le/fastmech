import { error } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ fetch, params }) {
	const res = await fetch(`${PUBLIC_API_URL}/details/${params.id}`);
	const details = await res.json();

	if (details) {
		return { details };
	}

	error(404, 'no findy ${params.id}');
}

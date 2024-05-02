import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const res = await fetch('https://po4cwo4.thockyspace.com/mechs/${params.id}');
	const details = await res.json();

	if (details) {
		return details;
	}

	error(404, 'Not found');
}

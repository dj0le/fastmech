import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const res = await fetch(`https://po4cwo4.thockyspace.com/details/${params.id}`);
	const details = await res.json();

	if (details) {
		return { details };
	}

	error(404, 'no findy ${params.id}');
}

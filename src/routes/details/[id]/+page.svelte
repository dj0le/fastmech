<script lang="ts">
	import { page } from '$app/stores';
	import { getAllMechs, getFilteredMechs } from '$lib/mech-state.svelte';
	import DecorativeLines from '$lib/components/DecorativeLines.svelte';

	const allMechs = $derived(getAllMechs());
	const filteredMechs = $derived(getFilteredMechs());

	let imageLoaded = $state(false);

	const mechId = $derived(Number($page.params.id));
	const mech = $derived(allMechs.find((m) => m.id === mechId));

	const filteredIndex = $derived(filteredMechs.findIndex((m) => m.id === mechId));
	const inFilteredSet = $derived(filteredIndex !== -1);
	const prevId = $derived(
		inFilteredSet
			? filteredMechs[(filteredIndex - 1 + filteredMechs.length) % filteredMechs.length].id
			: null
	);
	const nextId = $derived(
		inFilteredSet
			? filteredMechs[(filteredIndex + 1) % filteredMechs.length].id
			: null
	);

	$effect(() => {
		mechId;
		imageLoaded = false;
	});

	$effect(() => {
		if (!inFilteredSet) return;
		const prevMech =
			filteredMechs[(filteredIndex - 1 + filteredMechs.length) % filteredMechs.length];
		const nextMech = filteredMechs[(filteredIndex + 1) % filteredMechs.length];
		if (prevMech?.fullsize) new Image().src = `/static/fullsize/${prevMech.fullsize}`;
		if (nextMech?.fullsize) new Image().src = `/static/fullsize/${nextMech.fullsize}`;
	});
</script>

{#if mech}
	<main>
		<div class="wrapper">
			{#if inFilteredSet}
				<div class="arrow-nav">
					<a href="/details/{prevId}" data-sveltekit-preload-data="hover" id="left">&lt;</a>
				</div>
			{:else}
				<div></div>
			{/if}

			<div class="mech-overview">
				<div class="mech-grid faded">
					<div class="overview-image">
						<img
							class="card-image"
							class:image-loaded={imageLoaded}
							src="/static/fullsize/{mech.fullsize}"
							alt={mech.chassis}
							width="auto"
							height="1000"
							onload={() => (imageLoaded = true)}
						/>
					</div>

					<div class="column">
						<div class="info-grid">
							<div class="h1-container">
								<h1 class="decoration">{mech.chassis}</h1>
								<div class="lines">
									<DecorativeLines />
								</div>
							</div>
							<div class="details">
								<div class="column-left">
									<h2 class="overview-h2">overview:</h2>
								</div>
								<div class="column-right"></div>
								<div class="column-left">Designation:</div>
								<div class="column-right">{mech.shortName}</div>
								<div class="column-left">Year:</div>
								<div class="column-right">{mech.year}</div>
								<div class="column-left">Weight</div>
								<div class="column-right">{mech.weight}</div>
								<div class="column-left">Class:</div>
								<div class="column-right">{mech.weightClass}</div>
								<div class="column-left">Role:</div>
								<div class="column-right">{mech.role}</div>
								<div class="column-left">Cost:</div>
								<div class="column-right">{mech.cost}</div>
								<div class="column-left">BV:</div>
								<div class="column-right">{mech.bv}</div>
								<div class="column-left">Origin:</div>
								<div class="column-right">{mech.origin}</div>
								<div class="column-left">Armor Type:</div>
								<div class="column-right">{mech.armorType}</div>
								<div class="column-left">External Armor:</div>
								<div class="column-right">{mech.externalArmor}</div>
								<div class="column-left">Internal Armor:</div>
								<div class="column-right">{mech.internalArmor}</div>
								<div class="column-left">Structure Type:</div>
								<div class="column-right">{mech.structureType}</div>
								<div class="column-left">Engine:</div>
								<div class="column-right">{mech.engine}</div>
								<div class="column-left">Heat Capacity:</div>
								<div class="column-right">{mech.heatCapacity}</div>
								<div class="column-left">Heat Sinks:</div>
								<div class="column-right">{mech.heatSinks}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{#if inFilteredSet}
				<div class="arrow-nav column-two">
					<a href="/details/{nextId}" data-sveltekit-preload-data="hover" id="right">&gt;</a>
				</div>
			{:else}
				<div></div>
			{/if}
		</div>
	</main>
{:else}
	<main>
		<p class="not-found">Mech not found</p>
	</main>
{/if}

<style>
	.mech-grid {
		display: grid;
		grid-template-columns: 1.25fr 1fr;
		gap: 8px;
		align-items: center;
	}
	.h1-container {
		container-type: inline-size;
		display: grid;
		align-items: center;
	}
	.decoration {
		color: var(--text-2);
		font-family: var(--font-title);
		font-weight: var(--font-weight-hero);
		letter-spacing: calc(-1 * var(--letter-spacing-title));
		line-height: 0.9em;
	}
	.lines {
		width: 100%;
	}
	.faded {
		opacity: 0;
		animation: var(--animation-fade-in) forwards;
		animation-duration: 1s;
	}

	.overview-image {
		justify-self: end;
	}

	.card-image {
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.image-loaded {
		opacity: 1;
	}

	.info-grid {
		display: grid;
	}

	.details {
		display: grid;
		justify-self: start;
		grid-template-columns: 1fr 1.6fr;
		gap: 2px;
	}

	.column-left {
		color: var(--text-4);
		justify-self: end;
	}
	.column-right {
		justify-self: start;
		padding-left: 8px;
	}

	.overview-h2 {
		font-family: var(--font-title);
		font-size: 1.5rem;
		font-weight: var(--font-weight-bold);
		color: var(--text-4);
	}

	.not-found {
		text-align: center;
		font-family: var(--font-title);
		font-size: 1.5rem;
		color: var(--text-2);
		padding: 4rem 0;
	}

	@media (max-width: 1100px) {
		.mech-grid {
			grid-template-columns: 1fr;
		}
		.column {
			justify-self: center;
			padding-bottom: 4rem;
		}
		.decoration {
			padding-block: 32px;
			font-size: 14cqw;
		}
		.overview-h2 {
			justify-self: center;
			font-size: 1.25rem;
			text-decoration: underline;
		}
		.arrow-nav {
			padding-bottom: 4rem;
		}
		.lines {
			margin-top: -14%;
		}
	}
	@media (min-width: 1101px) {
		.h1-container {
			margin-left: -48px;
		}
		.decoration {
			text-align: left;
			font-size: 14cqw;
		}
		.overview-h2 {
			padding-top: 2rem;
			text-align: center;
			padding-right: 1.2rem;
		}
		.lines {
			margin-top: -7%;
		}
	}
</style>

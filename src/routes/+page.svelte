<script lang="ts">
	import { getFilteredMechs } from '$lib/mech-state.svelte';
	import DecorativeLines from '$lib/components/DecorativeLines.svelte';

	const filteredMechs = $derived(getFilteredMechs());
	let currentCard = $state(0);

	$effect(() => {
		filteredMechs;
		currentCard = 0;
	});

	const useSmallCarousel = $derived(filteredMechs.length > 0 && filteredMechs.length <= 6);

	const visibleCards = $derived.by(() => {
		const cards: number[][] = [];
		const offsets = useSmallCarousel ? [-2, -1, 1, 2] : [-4, -3, -2, -1, 1, 2, 3, 4];
		for (let i = 0; i < filteredMechs.length; i++) {
			cards.push(
				offsets.map((offset) => (i + offset + filteredMechs.length) % filteredMechs.length)
			);
		}
		return cards;
	});

	const cardStyles = $derived.by(() => {
		if (filteredMechs.length === 0 || visibleCards.length === 0) return [];

		const styles: Array<{ transform: string; zIndex: string; filter: string; opacity: string }> =
			[];
		const visible = visibleCards[currentCard];

		for (let i = 0; i < filteredMechs.length; i++) {
			if (i === currentCard) {
				styles.push({
					transform: 'translateY(-50%)',
					zIndex: '5',
					filter: 'none',
					opacity: '1'
				});
			} else if (visible) {
				const vi = visible.indexOf(i);
				if (vi !== -1) {
					let transform: string;
					let zIndex: string;
					let opacity: string;

					if (useSmallCarousel) {
						transform =
							vi <= 1
								? `translateX(${-((2 - vi) * 140)}px) translateY(calc(-50% + ${(2 - vi) * 30}px)) scale(${(vi + 1) * 0.3}) perspective(16px) rotateY(1deg)`
								: `translateX(${(vi - 1) * 140}px) translateY(calc(-50% + ${(vi - 1) * 30}px)) scale(${(4 - vi) * 0.3}) perspective(16px) rotateY(-1deg)`;
						zIndex = vi <= 1 ? String(vi + 1) : String(4 - vi);
						opacity = '0.4';
					} else {
						transform =
							vi <= 3
								? `translateX(${-((4 - vi) * 120)}px) translateY(calc(-50% + ${(4 - vi) * 40}px)) scale(${(vi + 1) * 0.2}) perspective(16px) rotateY(1deg)`
								: `translateX(${(vi - 3) * 120}px) translateY(calc(-50% + ${(vi - 3) * 40}px)) scale(${(8 - vi) * 0.2}) perspective(16px) rotateY(-1deg)`;
						zIndex = vi <= 3 ? String(vi + 1) : String(-(vi - 3));
						opacity = vi <= 0 || vi >= 7 ? '0' : '0.4';
					}

					styles.push({ transform, zIndex, filter: 'blur(1px)', opacity });
				} else {
					styles.push({ transform: 'none', zIndex: '0', filter: 'none', opacity: '0' });
				}
			} else {
				styles.push({ transform: 'none', zIndex: '0', filter: 'none', opacity: '0' });
			}
		}
		return styles;
	});

	function navigateCarousel(direction: 'left' | 'right') {
		if (filteredMechs.length === 0 || visibleCards.length === 0) return;
		const navRight = useSmallCarousel ? 2 : 4;
		const navLeft = useSmallCarousel ? 1 : 3;
		currentCard =
			direction === 'right' ? visibleCards[currentCard][navRight] : visibleCards[currentCard][navLeft];
	}
</script>

<svelte:head>
	<title>Mech-Index</title>
	<meta name="description" content="Mech Index" />
</svelte:head>

<section class="main">
	<div class="h1-container">
		<h1 class="headline">Mech Index</h1>
		<div class="lines">
			<DecorativeLines />
		</div>
	</div>
	{#if filteredMechs.length === 0}
		<p class="empty-state">No mechs match the current filters.</p>
	{:else}
		<div class="wrapper">
			<div>
				<button id="left" onclick={() => navigateCarousel('left')}>&lt;</button>
			</div>
			<ul class="carousel">
				{#each filteredMechs as mech, i}
					<li
						class="card"
						style:transform={cardStyles[i]?.transform}
						style:z-index={cardStyles[i]?.zIndex}
						style:filter={cardStyles[i]?.filter}
						style:opacity={cardStyles[i]?.opacity}
					>
						<div class="radial-gradient">
							<img
								class="card-image"
								src="/static/thumbs/{mech.thumbnail}"
								alt="{mech.chassis} Battlemech"
							/>
						</div>
						<div>
							<div class="content">
								<h3 class="card-title">{mech.chassis}</h3>
								<div class="info">
									<p>{mech.weightClass}</p>
									<p class="align-right">{mech.role}</p>
								</div>
							</div>

							<div class="controls">
								<a href="details/{mech.id}" class="button primary">
									Overview
									<svg
										width="18"
										height="10"
										viewBox="0 0 18 10"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M13.1667 1.6665L16.5 4.99984M16.5 4.99984L13.1667 8.33317M16.5 4.99984L1.5 4.99984"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</a>
							</div>
						</div>
					</li>
				{/each}
			</ul>
			<div class="column-two">
				<button id="right" onclick={() => navigateCarousel('right')}>&gt;</button>
			</div>
		</div>
	{/if}
</section>

<style>
	.h1-container {
		display: grid;
		place-items: center;
	}
	.lines {
		margin-top: -96px;
		width: 100%;
	}
	.headline {
		font-family: var(--font-title);
		color: var(--text-2);
		font-size: 208px;
		font-weight: var(--font-weight-hero);
		letter-spacing: var(--letter-spacing-title);
		line-height: 0.9em;
	}
	.carousel {
		position: relative;
		width: 100%;
		height: 520px;
		overflow: hidden;
		z-index: 5;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.primary {
		width: 100%;
		background: var(--text-1);
		color: var(--surface-1);
	}

	.primary:hover {
		color: var(--text-1);
		background-color: var(--link);
	}

	.controls {
		padding-top: 16px;
	}

	.card {
		position: absolute;
		transition: all 0.5s ease;
		width: clamp(200px, 25vw, 350px);
		left: 50%;
		top: 50%;
		margin-left: calc(clamp(200px, 25vw, 350px) / -2);
		display: grid;
		background-color: var(--surface-3);
		color: var(--text-3);
		border: 2px solid var(--border);
		border-radius: var(--radius-3);
		padding: 16px;
	}

	.card-title {
		font-family: var(--font-title);
		font-size: 1.75rem;
		font-weight: var(--font-weight-bold);
		text-shadow: 1px 1px 4px var(--text-1);
	}

	.card-image {
		object-fit: cover;
		object-position: center;
		margin-top: -8px;
	}

	.radial-gradient {
		margin-top: 8px;
		padding-inline: 8px;
		justify-self: center;
		height: 250px;
		background: radial-gradient(circle, var(--radial-1) 0%, var(--radial-2) 100%);
	}

	.content {
		padding-top: 16px;
		padding-inline: 8px;
	}

	.info {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-content: space-between;
		font-size: 1.375rem;
	}

	.align-right {
		text-align: end;
	}

	.empty-state {
		text-align: center;
		font-family: var(--font-title);
		font-size: 1.5rem;
		color: var(--text-2);
		padding: 4rem 0;
	}

	@media (max-width: 1160px) {
		.lines {
			margin-top: -74px;
		}
		.headline {
			font-size: clamp(3.125rem, -1.442rem + 19.231vw, 12.5rem);
		}
	}
	@media (max-width: 620px) {
		.lines {
			margin-top: -32px;
		}
	}
</style>

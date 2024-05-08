<script lang="ts">
	let { data } = $props();

	$effect(() => {
		const cards = document.querySelectorAll('.card');
		const navigation = document.querySelectorAll('.wrapper button');
		let visibleCards: number[][] = [];
		let currentCard = 0;
		const mechCount = cards.length;
		console.log(mechCount);

		for (let i = 0; i < cards.length; i++) {
			const offsets = [-4, -3, -2, -1, 1, 2, 3, 4].map((offset) => ({
				value: offset
			}));
			const card = [];
			for (const o of offsets) {
				card.push((i + o.value + cards.length) % cards.length);
			}
			visibleCards.push(card);
		}

		navigation.forEach((btn) => {
			btn.addEventListener('click', () => {
				btn.id === 'right'
					? (currentCard = visibleCards[currentCard][4])
					: (currentCard = visibleCards[currentCard][3]);
				loadCards();
			});
		});
		function loadCards() {
			const card = cards[currentCard];
			const visibleCard = visibleCards[currentCard];
			card.style.transform = 'none';
			card.style.zIndex = 5;
			card.style.filter = 'none';
			card.style.opacity = 1;

			for (let i = currentCard + 1; i != cards.length; i++) {
				cards[i].style.opacity = 0;
			}

			for (let i = 0; i < visibleCard.length; i++) {
				const card = cards[visibleCard[i]];
				card.style.filter = 'blur(1px)';
				card.style.zIndex = i <= 3 ? i + 1 : -(i - 3);
				card.style.opacity = i <= 0 || i >= 7 ? '0' : '.4';
				card.style.transform =
					i <= 3
						? `translateX(${-((4 - i) * 120)}px) translateY(${
								(4 - i) * 40
							}px) scale(${(i + 1) * 0.2}) perspective(16px) rotateY(1deg)`
						: `translateX(${(i - 3) * 120}px) translateY(${(i - 3) * 40}px) scale(${
								(8 - i) * 0.2
							}) perspective(16px) rotateY(-1deg)`;
			}
		}
		loadCards();
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Mech Index" />
</svelte:head>

<section class="main">
	<img class="headline" src="./mechindex.svg" alt="headline" />
	<div class="wrapper">
		<div>
			<button id="left">{`<`}</button>
		</div>
		<ul class="carousel">
			{#each data.mechs as mech}
				<li class="card">
					<div class="radial-gradient">
						<img
							class="card-image"
							src="https://po4cwo4.thockyspace.com/static/thumbs/{mech.thumbnail}"
							alt="TWO Battlemech"
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
			<button id="right">{`>`}</button>
		</div>
	</div>
</section>

<style>
	.headline {
		padding-bottom: 40px;
	}
	.carousel {
		position: relative;
		width: 100%;
		height: 520px;
		overflow: hidden;
		z-index: 5;
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
		transition: 0.5s;
		left: calc(50% - 130px);
		top: 0;
		display: grid;
		width: 280px;
		background-color: var(--surface-3);
		color: var(--text-3);
		border: 2px solid var(--border);
		border-radius: var(--radius-3);
		padding-inline: 16px;
		padding-block: 16px;
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
	}

	.radial-gradient {
		justify-self: center;
		height: 250px;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.28) 0%, rgba(0, 212, 255, 0) 60%);
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
</style>

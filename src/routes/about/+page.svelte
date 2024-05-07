<script lang="ts">
</script>

<main>
	<div class="wrapper">
		<div>
			<button id="left">{`<`}</button>
		</div>

		<div class="mech-overview">
			<div class="mech-grid">
				<div class="overview-image">
					<img
						class="card-image"
						src="./MWO_Banshee2.webp"
						alt="vindicator new"
						width="auto"
						height="1000"
					/>
				</div>

				<div>
					<h1 class="decoration">Banshee</h1>
					<div class="info-grid">
						<h2 class="overview-h2">overview</h2>
						<div class="details">
							<div class="column-left">Year:</div>
							<div class="column-right">3050</div>
							<div class="column-left">Designation:</div>
							<div class="column-right">VND-3L</div>
							<div class="column-left">Weight</div>
							<div class="column-right">45</div>
							<div class="column-left">Class:</div>
							<div class="column-right">Medium</div>
							<div class="column-left">Cost:</div>
							<div class="column-right">3524370</div>
							<div class="column-left">BV:</div>
							<div class="column-right">1105</div>
							<div class="column-left">Origin:</div>
							<div class="column-right">Inner Sphere</div>
							<div class="column-left">Armor Type:</div>
							<div class="column-right">Standard</div>
							<div class="column-left">External Armor:</div>
							<div class="column-right">144</div>
							<div class="column-left">Internal Armor:</div>
							<div class="column-right">75</div>
							<div class="column-left">Structure Type:</div>
							<div class="column-right">Standard</div>
							<div class="column-left">Engine:</div>
							<div class="column-right">180</div>
							<div class="column-left">Heat Capacity:</div>
							<div class="column-right">30</div>
							<div class="column-left">Heat Sinks:</div>
							<div class="column-right">15</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="column-two">
			<button id="right">{`>`}</button>
		</div>
	</div>
</main>

<style>
	.mech-grid {
		display: grid;
		grid-template-columns: 1.25fr 1fr;
		align-items: center;
	}
	.overview-image {
		justify-self: end;
	}
	.info-grid {
		display: grid;
		justify-content: start;
	}

	.details {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-items: center;
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

	.decoration {
		display: inline-block;
		background-image: url('/lines.svg');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 95%;
		color: transparent;
		background-clip: text;
		-webkit-background-clip: text;
		font-family: var(--font-title);
		font-weight: var(--font-weight-hero);
		letter-spacing: -var(--letter-spacing-title);
		line-height: 0.9em;
	}

	.overview-h2 {
		font-family: var(--font-title);
		font-size: 2rem;
		font-weight: var(--font-weight-bold);
		color: var(--text-4);
	}

	@media (max-width: 1100px) {
		.mech-grid {
			grid-template-columns: 1fr;
		}
		.decoration {
			padding-block: 32px;
			font-size: clamp(2rem, 10vw, 7.8125rem);
		}
	}

	@media (min-width: 1101px) {
		.decoration {
			font-size: clamp(3rem, 7vw, 7.8125rem);
			margin-left: -4rem;
		}
		.overview-h2 {
			padding-top: 2rem;
		}
	}
</style>

<script lang="ts">
	let { data } = $props();
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
						src="https://po4cwo4.thockyspace.com/static/mech_images/{data.details.fullsize}"
						alt={data.details.chassis}
						width="1000"
						height="1000"
					/>
				</div>

				<div>
					<h1 class="decoration">{data.details.chassis}</h1>
					<div class="info-grid">
						<h2 class="overview-h2">overview</h2>
						<div class="details">
							<div class="column-left">Year:</div>
							<div class="column-right">{data.details.year}</div>
							<div class="column-left">Designation:</div>
							<div class="column-right">{data.details.model}</div>
							<div class="column-left">Weight</div>
							<div class="column-right">{data.details.weight}</div>
							<div class="column-left">Class:</div>
							<div class="column-right">{data.details.weightClass}</div>
							<div class="column-left">Cost:</div>
							<div class="column-right">{data.details.cost}</div>
							<div class="column-left">BV:</div>
							<div class="column-right">{data.details.bv}</div>
							<div class="column-left">Origin:</div>
							<div class="column-right">{data.details.isClan}</div>
							<div class="column-left">Armor Type:</div>
							<div class="column-right">{data.details.armorType}</div>
							<div class="column-left">External Armor:</div>
							<div class="column-right">{data.details.totalExternalArmor}</div>
							<div class="column-left">Internal Armor:</div>
							<div class="column-right">{data.details.totalInternalArmor}</div>
							<div class="column-left">Structure Type:</div>
							<div class="column-right">{data.details.structureType}</div>
							<div class="column-left">Engine:</div>
							<div class="column-right">{data.details.engine}</div>
							<div class="column-left">Heat Capacity:</div>
							<div class="column-right">{data.details.heatCapacity}</div>
							<div class="column-left">Heat Sinks:</div>
							<div class="column-right">{data.details.heatSinks}</div>
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

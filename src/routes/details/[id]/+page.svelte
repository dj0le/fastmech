<script lang="ts">
	let { data } = $props();
	let totalMechs = 96;
	console.log(totalMechs);

	function previousMech(mechId: number) {
		mechId = (mechId - 1 + totalMechs) % totalMechs;
		if (mechId === 0) {
			mechId = totalMechs - 1;
		}
		return mechId;
	}
	function nextMech(mechId: number) {
		mechId = (mechId + 1 + totalMechs) % totalMechs;
		if (mechId === 0) {
			mechId = 1;
		}
		return mechId;
	}
</script>

<main>
	<div class="wrapper">
		<div class="arrow-nav">
			<a href={previousMech(data.details.id)} id="left">{`<`}</a>
		</div>

		<div class="mech-overview">
			<div class="mech-grid faded">
				<div class="overview-image">
					<img
						class="card-image"
						src="https://po4cwo4.thockyspace.com/static/fullsize/{data.details.fullsize}"
						alt={data.details.chassis}
						width="auto"
						height="1000"
					/>
				</div>

				<div class="column">
					<div class="info-grid">
						<div class="h1-container">
							<h1 class="decoration">{data.details.chassis}</h1>
							<div class="lines">
								<svg
									width="1138"
									height="21"
									viewBox="0 0 1138 21"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M0 19H1138" stroke="#899D82" stroke-opacity="0.8" stroke-width="3" />
									<path d="M0 10H1138" stroke="#899D82" stroke-opacity="0.6" stroke-width="2" />
									<path d="M0 1H1138" stroke="#899D82" stroke-opacity="0.4" stroke-width="2" />
								</svg>
							</div>
						</div>
						<div class="details">
							<div class="column-left">
								<h2 class="overview-h2">overview:</h2>
							</div>
							<div class="column-right"></div>
							<div class="column-left">Designation:</div>
							<div class="column-right">{data.details.shortName}</div>
							<div class="column-left">Year:</div>
							<div class="column-right">{data.details.year}</div>
							<div class="column-left">Weight</div>
							<div class="column-right">{data.details.weight}</div>
							<div class="column-left">Class:</div>
							<div class="column-right">{data.details.weightClass}</div>
							<div class="column-left">Role:</div>
							<div class="column-right">{data.details.role}</div>
							<div class="column-left">Cost:</div>
							<div class="column-right">{data.details.cost}</div>
							<div class="column-left">BV:</div>
							<div class="column-right">{data.details.bv}</div>
							<div class="column-left">Origin:</div>
							<div class="column-right">{data.details.origin}</div>
							<div class="column-left">Armor Type:</div>
							<div class="column-right">{data.details.armorType}</div>
							<div class="column-left">External Armor:</div>
							<div class="column-right">{data.details.externalArmor}</div>
							<div class="column-left">Internal Armor:</div>
							<div class="column-right">{data.details.internalArmor}</div>
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

		<div class="arrow-nav column-two">
			<a href={nextMech(data.details.id)} id="right">{`>`}</a>
		</div>
	</div>
</main>

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
		letter-spacing: -var(--letter-spacing-title);
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
			margin-left: -24px;
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
			margin-top: -6%;
		}
	}
</style>

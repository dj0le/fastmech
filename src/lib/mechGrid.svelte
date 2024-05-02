<script lang="ts">
	export let data;
</script>

{#each data.mechs as mech}
	<li class="card">
		<div class="radial-gradient">
			<img
				class="card-image"
				src="https://po4cwo4.thockyspace.com/static/mech_thumbnails/{mech.thumbnail}"
				alt="TWO Battlemech"
				width="200"
				height="200"
			/>
		</div>
		<div>
			<div class="content">
				<h3 class="card-title">{mech.chassis}</h3>
				<div class="info">
					<p>{mech.weightClass}</p>
					<p class="align-right">{mech.year}</p>
				</div>
			</div>

			<div class="controls">
				<a href="mechs/{mech.id}" class="button primary">
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

<style>
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
		width: 260px;
		background-color: var(--surface-3);
		color: var(--text-3);
		border: 2px solid var(--border);
		border-radius: var(--radius-3);
		padding-inline: 16px;
		padding-block: 24px;
	}

	.card-title {
		font-family: var(--font-title);
		font-size: 1.75rem;
		font-weight: var(--font-weight-bold);
	}

	.card-image {
		object-fit: cover;
		object-position: center;
	}

	.radial-gradient {
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

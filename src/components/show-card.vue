<template>
	<li class="card">
		<g-link :to="`/shows/${show.slug}/`">
			<vue-aspect-ratio
				class="artwork"
				ar="1:1"
			>
				<g-image
					:src="assets+show.artwork.id"
					alt=""
					class="image-fit"
				/>
			</vue-aspect-ratio>
		</g-link>
		<div class="infoContainer">
			<div class="info">
				<g-link class="los" :to="`/shows/${show.slug}/`">
					<h2 class="title">
						{{ show.title }}
					</h2>
				</g-link>
				<div class="producers">
					by <g-link
						v-for="{ producers_id } in show.producers"
						:key="producers_id.id"
						:to="`/producers/${producers_id.slug}/`"
					>
						{{ producers_id.first_name }} {{ producers_id.last_name }}
					</g-link>
				</div>
			</div>
			<button class="play" @click="$store.dispatch('playPause', show)">
				<play-icon v-if="!$store.getters.isThisPlaying(show)" :size="50" />
				<pause-icon v-else :size="50" />
			</button>
		</div>
	</li>
</template>

<script>
import { assets } from '~/assets/constants'
export default {
	props: {
		show: Object,
	},
	data() {
		return { assets }
	},
	mounted() {
		// console.log(this.show)
	},
}
</script>

<style scoped>
	/* .material-design-icon {
		display: inline-flex;
		align-self: center;
		position: relative;
		height: 100%;
		width: 100%;
	}

	.material-design-icon > .material-design-icon__svg {
		height: 100%;
		width: 100%;
		fill: currentColor;
		position: absolute;
	} */

	.card {
		max-width: 400px;
		width: 100%;
		background-color: var(--bg-color);
		border-color: var(--text-color);
		border-width: var(--border-width);
		border-style: solid;
		padding: var(--standard-spacing);
		position: relative;
	}

	.card > *:not(:last-child) {
		margin-bottom: var(--standard-spacing);
	}

	a {
		color: var(--text-color);
	}

	.card > a {
		text-decoration: none;
		color: var(--text-color);
		display: block;
		width: 100%;
		border: var(--border-width) solid var(--text-color);
	}

	.title {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 1.1rem;
		letter-spacing: 0.03rem;
		font-weight: 500;
	}

	.producers {
		letter-spacing: 0.03rem;
	}

	.los {
		text-decoration: none;
	}

	.infoContainer {
		display: flex;
		width: 100%;
	}

	.play {
		border: solid var(--text-color) var(--border-width);
		background-color: var(--main-color);
		width: 62px;
		height: 62px;
		margin: 0;
		padding: 0;
	}

	.info {
		border: var(--border-width) solid var(--text-color);
		padding: var(--standard-spacing);
		margin-right: var(--standard-spacing);
		overflow: hidden;
		flex: 1;
		background-color: var(--main-color);
	}

</style>
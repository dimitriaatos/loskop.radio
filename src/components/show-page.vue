<template>
	<main>
		<vue-aspect-ratio
			class="artwork"
			ar="1:1"
		>
			<g-image
				v-if="show.isLive"
				src="/generative.jpg"
				class="image-fit"
			/>
			<g-image
				v-else
				:src="assets+show.artwork.id"
				class="image-fit"
			/>
		</vue-aspect-ratio>
		<div class="infoContainer">
			<div class="playerContainer">
				<div class="player">
					<vue-aspect-ratio ar="1:1" class="playContainer">
						<button class="play" @click="$store.dispatch('playPause', show)">
							<play-icon
								v-if="!$store.getters.isThisPlaying(show)"
								:size="70"
							/>
							<pause-icon
								v-else
								:size="70"
							/>
						</button>
					</vue-aspect-ratio>
					<div class="info">
						<div class="dateDuration">
							<div class="date">
								{{ show.isLive ? show.date : formatDate(show.date) }}
							</div>
							<div v-if="!show.isLive" class="duration">
								{{ formatedDuration }}
							</div>
						</div>
						<h1>
							{{ show.title }}
						</h1>
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
				</div>
			</div>
		</div>
		<div class="description" v-html="show.description" />
		<a
			v-if="show.attachment && show.attachment.id"
			:href="assets+show.attachment.id"
			target="_blank"
			class="attachment"
		><file-outline-icon :size="30" />Program Notes</a>
		<!-- <a
			v-if="show.audio && show.audio.id"
			:href="assets+show.audio.id"
			download="los.mp3"
			class="attachment"
		><file-download-outline-icon :size="30" />Download</a> -->
		<slot />
		<div class="space" />
	</main>
</template>

<script>
import { format } from 'date-fns'
import { duration } from 'duration-pretty'
import { assets } from '~/assets/constants'
export default {
	props: {
		show: Object,
	},
	data() {
		return {
			assets,
			// $store: store,
		}
	},
	computed: {
		formatedDuration() {
			const dur = this.show.audio.duration || 0
			return duration(dur, 'seconds').format('mm\' ss\'\'')
		}
	},
	mounted(){
		// console.log(this.show)
	},
	methods: {
		formatDate: (string) => string && format(new Date(string), 'dd.MM.yyyy'),
	},
}
</script>

<style scoped>
main {
	width: 100%;
	max-width: 1000px;
}

li {
	list-style: square;
}

.attachment {
	display: flex;
	align-items: center;
	font-weight: bolder;
}

.artwork {
	width: 50%;
	float: left;
	border: var(--border-width) solid var(--text-color);
	margin-right: calc(2 * var(--standard-spacing));
	margin-bottom: calc(2 * var(--standard-spacing));
}

.playerContainer {
	display: flex;
	margin-bottom: calc(var(--standard-spacing) * 3);
}

.player {
	width: 100%;
	display: flex;
	align-items: flex-start;
}

.play {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: var(--main-color);
}

.playContainer {
	width: 70px;
	border: var(--border-width) solid var(--text-color);
	margin-right: var(--standard-spacing);
}

.play > * {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.dateDuration {
	display: flex;
	justify-content: space-between;
	font-weight: 300;
	font-size: 13px;
	letter-spacing: 0.07em;
}

.duration {
	display: none;
}

.info {
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	flex: 1;
	width: 50%;
}

.producers {
	font-size: 15px;
	font-weight: 300;
	letter-spacing: 0.07em;
}

.producers a {
	font-style: italic;
	color: var(--text-color);
	user-select: auto;
}

.description {
	font-size: 1rem;
	line-height: 23px;
	letter-spacing: 0.04em;
}

@media screen and (max-width: 650px) {
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.artwork {
		width: 100%;
		max-width: 350px;
		margin: var(--standard-spacing) 0;
	}

	.infoContainer {
		width: 100%;
	}

	.playerContainer {
		margin-bottom: var(--standard-spacing);
	}
}
</style>
<template>
	<div class="meta user-select-none" :class="{ hide: !showSelected }">
		<audio
			ref="audio"
			autoplay
			preload="metadata"
			crossorigin="anonymus"
			type="audio/mpeg"
			:loop="isLive"
			:src="isLive ? './../blank.mp3' : (show.audio.id && assets+show.audio.id)"
			@playing="!isLive && (loading = false)"
			@waiting="!isLive && (loading = true)"
			@play="playing || $store.dispatch('playPause')"
			@pause="playing && $store.dispatch('playPause')"
		/>
		<hr :class="{live: isLive}">
		<!-- <button
			class="playPause"
			:class="{ playing: $store.getters.isPlaying, loading: loading }"
			@click="$store.dispatch('playPause')"
		/> -->
		<button class="playPause" @click="$store.dispatch('playPause')">
			<div v-if="loading" class="loading" />
			<play-icon v-else-if="!$store.getters.isPlaying" :size="60" />
			<pause-icon v-else :size="60" />
		</button>
		<div class="title">
			<g-link :to="isLive ? show.slug : `/shows/${show.slug}/`">
				{{ show.title }}
			</g-link>
		</div>
		<div v-if="isLive" class="producers">
			LIVE NOW! <span class="blink">
				<div class="dot" />
			</span>
		</div>
		<div v-else class="producers">
			by <g-link
				v-for="{ producers_id } in show.producers"
				:key="producers_id.id"
				:to="`/producers/${producers_id.slug}/`"
			>
				{{ producers_id.first_name }} {{ producers_id.last_name }}
			</g-link>
		</div>
		<div />
		<img
			v-if="isLive"
			class="progressBar live"
			src="./../assets/generative/vector.svg"
			alt=""
		>
		<input
			v-else
			ref="progressBar"
			class="progressBar"
			type="range"
			:value="ms"
			min="0"
			:max="max"
			@change="timeChange"
		>
		<div v-if="!isLive" class="time">
			<span class="current">{{ formattedTime }}</span>/{{ length }}
		</div>
		<div class="volume">
			<div class="speaker" />
			<input
				type="range"
				value="1"
				min="0"
				max="1"
				step="0.05"
				@input="volumeChange"
			>
		</div>
	</div>
</template>

<script>
import { duration } from 'duration-pretty'
import { assets, localAssets } from '~/assets/constants'
import Generative from 'generative-radio'
import pieces from '~/assets/generative/pieces.json'
import mediaNotification, { chromeMetaAdaptor } from '~/assets/mediaNotification'

export default {
	data() {
		return {
			assets,
			localAssets,
			imgLoaded: false,
			loading: false,
			ms: 0,
			max: 0,
			skipping: false,
		}
	},
	computed: {
		isLive() {
			return this.$store.getters.show.isLive
		},
		formattedTime() {
			return duration(this.ms,'seconds').format('H:mm:ss')
		},
		length() {
			return duration(this.max,'seconds').format('H:mm:ss')
		},
		playing() {
			return this.$store.getters.isPlaying
		},
		show() {
			return this.$store.getters.show
		},
		showSelected() {
			return this.$store.getters.show.slug != '' || this.$store.getters.show.isLive
		},
	},
	watch: {
		show(val, oldVal){
			if (val.isLive) {
				console.log('show play')
				this.live.playing || this.live.play()
				this.loading = true
			}
			if (!val.isLive && oldVal.isLive) {
				console.log('show stop')
				this.live.stop()
			}
			mediaNotification(chromeMetaAdaptor(val))
		},
		playing(val, oldVal) {
			if (val != oldVal) {
				if(this.isLive && this.live.playing != val) {
					this.loading = val
					console.log(`playing ${val ? 'play' : 'stop'}`)
					this.live.playing != val && this.live[val ? 'play' : 'stop']()
				}
				this.$refs.audio[val ? 'play' : 'pause']()?.catch(console.log)
				this.$refs.audio.addEventListener('canplaythrough', () => {this.playing && this.$refs.audio.play})
			}
		},
	},
	mounted() {
		const audio = this.$refs.audio
		this.live = new Generative(pieces)
		// this.live.debug = true
		this.live.token = 'PZnTCc2l8KUJCURXtIyU5hEuA30nDjItK9HTrSrk'
		this.live.ontrigger = ({ sound, numPlayers }) => {
			this.loading = this.playing && !numPlayers
			if (sound) {
				const index = this.$store.dispatch('sound', {sound, play: true})
				setTimeout(
					() => { this.$store.dispatch('sound', {sound, play: false, index}) },
					Math.max(sound.duration, 5) * 1000
				)
			}
		}
		// this.live.play()
		// setTimeout(() => {
		// 	this.live.stop()
		// },10000)
		audio.ontimeupdate = () => this.skipping || (this.ms = audio.currentTime)
		audio.onloadedmetadata = () => {
			this.max = audio.duration
		}
		document.addEventListener('keydown', (event) => {
			if (event.key == ' ') {
				event.preventDefault()
				this.$store.dispatch('playPause')
			} else if (Array(10).fill().map((a, i) => i).includes(Number(event.key))) {
				this.timeChange({target: {value: this.max*Number(event.key)/10}})
			}
		})
		if (this.$refs.progressBar) {
			this.$refs.progressBar.onmousedown = () => { this.skipping = true }
			this.$refs.progressBar.onmouseup = () => { this.skipping = false }
		}
	},
	methods: {
		// play() {
		// 	this.$store.dispatch('playPause')
		// 	this.$refs.audio[this.$store.getters.isPlaying ? 'play' : 'pause']()
		// },
		load(state) {
			this.loading = state
		},
		timeChange({target: { value }}) {
			this.$refs.audio.currentTime = value
		},
		volumeChange({target: { value }}) {
			if (this.isLive) {
				this.live.gain = value
			} else {
				this.$refs.audio.volume = value
			}
		},
	}
}
</script>


<style scoped>

@keyframes blink {
	0%,
	100% {
		opacity: 0;
	}

	50% {
		opacity: 1;
	}
}

.blink {
	animation: blink 2s linear infinite both;
}

.dot {
	display: inline-block;
	width: 0.7em;
	height: 0.7em;
	background-color: red;
	border-radius: 50%;
	margin: auto;
}

.meta {
	display: grid;
	grid-template-rows: [border] auto [title] 1fr [details] 1fr;
	grid-template-columns: [play] 60px [info] auto [progress] 1fr [volume] 140px;
	justify-items: flex-start;
	align-items: center;
	column-gap: var(--p-spacing);
	background-color: var(--main-color);
	padding-bottom: var(--p-spacing);
	white-space: nowrap;
}

hr {
	border-top: var(--p-line-width) solid var(--text-color);
	grid-row: 1 / span 1;
	grid-column: 1 / span 4;
	width: 100%;
	padding-bottom: var(--p-spacing);
}

.playPause {
	grid-row: 2 / span 2;
	grid-column: 1 / span 1;
	justify-self: center;

	/* border: solid red 1px; */
	opacity: 1;
	height: 55px;
	width: 55px;

	/* border-radius: 50%; */
	outline: none;
	overflow: hidden;
	display: flex;
	justify-content: center;
}

.loading {
	display: block;
	border-style: dashed;
	border-width: var(--standard-spacing);
	border-color: black;
	border-radius: 50%;
	animation: rot 10s linear 0s infinite normal none;
	pointer-events: none;
	width: 100%;
	height: 100%;
}

@keyframes rot {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}

a {
	color: var(--text-color);
	text-decoration: none;
}

.title a {
	font-size: 1.1rem;
}

.title {
	grid-area: 2/2/2/2;
	white-space: nowrap;
	letter-spacing: 0.03rem;
	font-weight: 500;
}

.producers {
	grid-area: details / info / details / info;
	width: 100%;
}

.producers a {
	font-style: italic;
	border-bottom: 1px solid black;
}

.progressBar {
	grid-row: 2 / span 2;
	grid-column: 3 / span 1;
}

.progressBar.live {
	overflow: hidden;
	height: 40px;
}

.time {
	grid-row: 3 / span 1;
	grid-column: 3 / span 1;
	text-align: right;
	justify-self: flex-end;
	font-size: 0.8rem;
	font-weight: 300;
	letter-spacing: 0.07em;
}

.time .current {
	text-align: right;
	width: 4ch;
	display: inline;
	margin: 0;
}

.volume {
	grid-row: 2 / span 2;
	grid-column: 4 / span 1;
	width: 120px;
	display: flex;
	justify-self: center;
	background-color: var(--bg-color);
	height: 100%;
}

.speaker {
	min-width: 40px;
	display: inline-block;
	background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M18.5%2012c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73%202.5-2.25%202.5-4.02zM5%209v6h4l5%205V4L9%209H5z%22%2F%3E%3C%2Fsvg%3E");
	background-repeat: no-repeat;
	background-size: 80%;
	background-position: center;
	background-color: var(--main-color);
}

input[type="range"] {
	background-color: var(--main-color);
	-webkit-appearance: none;
	width: 100%;
	padding: var(--p-spacing) 0;
	cursor: pointer;
}

/* bar */
input[type="range"]::-webkit-slider-runnable-track {
	width: 100%;
	height: var(--p-line-width);
	background: var(--text-color);
}

input[type="range"]::-moz-range-track {
	width: 100%;
	height: var(--p-line-width);
	background: var(--text-color);
}

input[type="range"]::-ms-track {
	width: 100%;
	height: var(--p-line-width);
	background: var(--text-color);
	border-color: transparent;
	color: transparent;
}

/* thumb */
input[type="range"]::-webkit-slider-thumb {
	height: var(--p-thumb-size);
	width: var(--p-thumb-size);
	background: var(--text-color);
	-webkit-appearance: none;
	margin-top: calc(-1 * var(--p-thumb-size) * 0.5 + var(--p-border-width));
	border-radius: 50%;
	border: var(--main-color) var(--p-border-width) solid;
}

input[type="range"]::-moz-range-thumb {
	height: var(--p-thumb-size);
	width: var(--p-thumb-size);
	background: var(--text-color);
	border-radius: 50%;
	border: var(--main-color) var(--p-border-width) solid;
}

input[type="range"]::-ms-thumb {
	height: var(--p-thumb-size);
	width: var(--p-thumb-size);
	background: var(--text-color);
	border-radius: 50%;
	border: var(--main-color) var(--p-border-width) solid;
}

/* .volume input[type="range"] {
} */

@media screen and (max-width: 650px) {
	.progressBar {
		grid-row: 1 / span 1;
		grid-column: 1 / span 4;
	}

	hr:not(.live) {
		display: none;
	}

	.title {
		letter-spacing: 0.1vw;
		grid-column: 2 / span 2;
		justify-self: center;
	}

	.volume {
		display: none;
	}

	.meta {
		grid-template-columns: [play] 60px [info] auto [progress] 1fr;
	}

	.progressBar.live {
		display: none;
	}
}

@media (hover: none) {
	.volume {
		display: none;
	}

	.meta {
		grid-template-columns: [play] 60px [info] auto [progress] 1fr;
	}
}

/* @media screen and (max-width: 650px) {

} */

</style>
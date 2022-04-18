<template>
	<Layout>
		<main>
			<div class="producer">
				<img :src="$context.avatar && assets+$context.avatar.id" class="image-fit avatar">
				<h1>
					{{ $context.first_name }} {{ $context.last_name }}
				</h1>
				<div class="description" v-html="$context.description" />
			</div>
			<div v-if="shows.length > 0" class="shows">
				<div class="divider user-select-none">
					SHOWS
				</div>
				<ul>
					<show-card
						v-for="show in shows"
						:key="show.id"
						:show="show"
					/>
				</ul>
			</div>
			<div class="space" />
		</main>
	</Layout>
</template>

<script>
import { format } from 'date-fns'
import { duration } from 'duration-pretty'
import { assets } from '~/assets/constants'
import ShowCard from '~/components/show-card'

export default {
	components: {
		'show-card': ShowCard,
	},
	data() {
		return {
			assets,
			// $store: store,
		}
	},
	computed: {
		formatedDuration() {
			const dur = 1000
			return duration(dur, 'seconds').format('mm\' ss\'\'')
		},
		shows() {
			return this.$context.shows.map(show => show.shows_id)
		}
	},
	mounted(){
		// console.log(this.$context.shows.map(show => show.shows_id))
	},
	methods: {
		formatDate: (string) => format(new Date(string), 'dd.MM.yyyy'),
	},
	metaInfo() {
		return {
			title: `${ this.$context.first_name || '' } ${ this.$context.last_name || '' } - Loskop`,
			meta: [
				{
					property: 'og:image',
					content: assets+this.$context.avatar.id,
				}
			]
		}
	}
}
</script>

<style scoped>

main {
	width: 100%;
	word-wrap: break-word;
	max-width: 1000px;
}

ul {
	/* display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-content: flex-start; */
	list-style: none;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(min(calc(180px + 10vmin), 100%), 1fr));
	grid-gap: calc(var(--standard-spacing) * 2);
}

ul > li {
	/* align-self: center; */
	justify-self: center;
}

.avatar {
	width: 200px;
	height: 200px;
	border-radius: 50%;
	float: left;
	margin-right: calc(3 * var(--standard-spacing));
	margin-bottom: calc(3 * var(--standard-spacing));
}

h1 {
	text-align: left;
	margin-bottom: 1rem;
}

.producer {
	clear: left;
	overflow: auto;
}

.shows {
	margin: var(--standard-spacing) auto;
	clear: left;
}

.divider {
	display: flex;
	align-items: flex-start;
	text-align: left;
	font-size: 1.2rem;
	margin: 20px 0;
	font-weight: 200;
}

.divider::after {
	content: '';
	flex-grow: 1;
	height: var(--border-width);
	background: var(--text-color);
	min-width: 20px;
	margin: auto;
	margin-left: var(--standard-spacing);
}

@media screen and (max-width: 650px) {
	h1 {
		white-space: normal;
		text-align: center;
		font-size: 1.1rem;
	}

	.avatar {
		display: block;
		float: none;
		margin: auto;
		margin-bottom: 1rem;
	}
}
</style>
<template>
	<Layout>
		<ul>
			<show-card
				v-for="show in shows.sort((a,b) => b.date - a.date)"
				:key="show.id"
				:show="show"
			/>
		</ul>
		<div class="space" />
	</Layout>
</template>

<page-query>
query {
	directus {
		items {
			home {
				image {
					filename_disk
				}
			}
			shows {
				id
				title
				date
				artwork {
					id
				}
				audio {
					id
				}
				attachment {
					id
				}
				producers {
					producers_id {
						id
						first_name
						last_name
						slug
					}
				}
				slug
			}
		}
	}
}
</page-query>

<script>
import ShowCard from '~/components/show-card'
import { assets } from '~/assets/constants'
export default {
	components: {
		'show-card': ShowCard,
	},
	computed: {
		shows() {
			return this.$page.directus.items.shows.slice().sort((a, b) => (new Date(b.date)) - (new Date(a.date)))
		},
	},
	mounted(){
		// console.log(this.shows)
	},
	methods: {
		removeFileExtension(path) {
			return path.split('.').slice(0, -1).join('.')
		}
	},
	metaInfo() {
		return {
			title: 'All shows - Loskop',
			meta: [
				{
					property: 'og:image',
					content: assets+this.removeFileExtension(this.$page.directus.items.home.image.filename_disk),
				}
			]
		}
	}
}
</script>

<style scoped>
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
</style>

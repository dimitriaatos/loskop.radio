<template>
	<Layout>
		<show-page :show="show">
			<ul>
				<li v-for="(sound, index) in $store.getters.sounds" :key="index">
					<div>{{ sound.username }}. <i>{{ sound.name }}</i>. Freesound, {{ new Date(sound.created).getFullYear() }}. <a target="_blank" :href="sound.url">Visit</a>.</div>
				</li>
			</ul>
		</show-page>
	</Layout>
</template>

<page-query>
query {
	directus {
    items {
      generative {
        description
				pieces
      }
    }
  }
}
</page-query>

<script>
import ShowPage from '~/components/show-page'

export default {
	components: {
		'show-page': ShowPage,
	},
	computed: {
		show() {
			return {
				id: 'generative',
				slug: this.$route.path,
				title: 'GENERATIVE RADIO',
				description: this.$page.directus.items.generative.description,
				date: 'LIVE NOW!',
				isLive: true,
				pieces: this.$page.directus.items.generative.pieces,
				audio: {
					path: 'blank.mp3',
				},
				artwork: {
					id: '/generative.jpg'
				},
				producers: [
					{
						producers_id: {
							id: 'kedimoura',
							first_name: 'KeDiMouRa',
							slug: 'kedimoura',
						}
					}
				]
			}
		},
	},
	mounted() {
		// console.log(this.$page.directus.items.generative.pieces)
	},
	metaInfo: {
		title: 'Generative radio - Loskop',
		meta: [
			{
				property: 'og:image',
				content: '/generative.jpg',
			}
		]
	}
}
</script>

<style scoped>
li {
	list-style: square;
}

ul {
	min-height: 20em;
}
</style>
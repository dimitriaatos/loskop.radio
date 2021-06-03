<template>
	<Layout>
		<show-page :show="$context" />
	</Layout>
</template>

<script>
import ShowPage from '~/components/show-page'
import { assets } from '~/assets/constants'
export default {
	components: {
		'show-page': ShowPage,
	},
	mounted(){
		// console.log(assets+this.$context.artwork.id)
	},
	metaInfo() {
		return {
			title: `${this.$context.title} - Loskop`,
			meta: [
				{
					property: 'og:image',
					content: assets+this.$context.artwork.id,
				}
			]
		}
	}
}
</script>

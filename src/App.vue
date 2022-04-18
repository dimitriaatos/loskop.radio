<template>
	<div id="app">
		<router-view />
		<loskop-player class="player" />
		<!-- <script
			data-goatcounter="https://loskopradio.goatcounter.com/count"
			async
			src="https://gc.zgo.at/count.js"
		/> -->
		<component
			is="script"
			src="https://gc.zgo.at/count.js"
			async="true"
			data-goatcounter="https://loskopradio.goatcounter.com/count"
		/>
	</div>
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
import loskopPlayer from '~/components/loskop-player.vue'
export default {
	components: {
		'loskop-player': loskopPlayer
	},
	metaInfo() {
		return {
			title: 'Loskop Radio',
			meta: [
				{
					key: 'description',
					name: 'description',
					content: this.$static.metadata.siteDescription
				}
			]
		}
	}
}
</script>

<style scoped>
.player {
	width: 100vw;
	position: fixed;
	bottom: 0;
	left: 0;
}

#app {
	display: flex;
	justify-content: center;
	width: 100%;
}
</style>
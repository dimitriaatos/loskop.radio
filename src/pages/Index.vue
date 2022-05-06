<template>
	<Layout>
		<main>
			<img :src="assets+removeFileExtension($page.directus.items.home.image.filename_disk)">
			<div class="content" v-html="pToSpan($page.directus.items.home.description)" />
		</main>
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
        description
      }
    }
  }
}
</page-query>

<script>
import { assets } from '~/assets/constants'
export default {
	data(){
		return {assets}
	},
	metaInfo() {
		return {
			title: 'Loskop Radio',
			meta: [
				{
					property: 'og:image',
					name: 'og:image',
					content: 'loskop_face.jpg',
				},
			],
		}
	},
	mounted() {
	},
	methods: {
		removeFileExtension(path) {
			return path.split('.').slice(0, -1).join('.')
		},
		pToSpan(html) {
			return html.replace(/<\/p>\n<p>/g, '<br/>').replace(/(<\/?)p>/g, '$1span>')
		},
	},
}
</script>

<style>
main {
	max-width: 1000px;
	display: flex;
}

img {
	width: 40vh;
}

.content {
	text-align: left;
	margin: auto;
	font-weight: 600;
}

.content span {
	color: var(--bg-color);
	font-size: 25px;
	box-shadow: 0 0 0 10px black; /* Tune line "padding" here */
	line-height: 2.2; /* Tune line "margin" here */
	background-color: black;
	-moz-box-shadow: 0 0 0 10px #000;
	-webkit-box-shadow: 0 0 0 10px #000;
	-ms-box-shadow: 0 0 0 10px #000;
	-o-box-shadow: 0 0 0 10px #000;
	box-decoration-break: clone;
}

@media screen and (max-width: 650px) {
	main {
		flex-direction: column;
		align-items: center;
	}

	img {
		width: 30vh;
		margin-bottom: 10px;
	}

	.content p {
		font-size: 16px;
		line-height: 2.7;
	}
}
</style>

<template>
	<div class="page">
		<header class="user-select-none">
			<g-link to="/">
				<g-image
					class="title"
					src="~/assets/title.svg"
					alt=""
				/>
			</g-link>
			<nav class="nav">
				<g-link
					class="nav__link"
					:to="`/generative-radio/`"
					:class="{ selected: sel('generative-radio') }"
				>GENERATIVE<span class="gen-space"> </span>RADIO</g-link>
				<g-link
					class="nav__link"
					:to="`/shows/`"
					:class="{ selected: sel('shows') }"
				>SHOWS</g-link>
				<g-link
					class="nav__link"
					:to="`/about/`"
					:class="{ selected: sel('about') }"
				>ABOUT</g-link>
			</nav>
		</header>
		<div class="layout">
			<slot />
		</div>
	</div>
</template>

<script>
import path from 'path'

export default {
	data(){
		return {
			nav: {
				'generative-radio': 'GENERATIVE RADIO',
				'shows': 'SHOWS',
				'about': 'ABOUT',
			}
		}
	},
	methods: {
		sel(href) {
			return path.normalize(this.$route.path).includes(path.normalize(href))
		},
	},
}
</script>

<style>
@import './../assets/reset.css';
@import './../assets/theme.css';

.bottomSpace {
	height: 300px;
}

h1,
h2,
h3 {
	margin: 0;
}

h1 {
	/* font-size: 1.5vw; */
	font-size: 1.2rem;
	font-weight: 700;
	letter-spacing: 0.4vw;
	white-space: nowrap;
	width: 100%;
}

@media screen and (max-width: 990px) {
	h1 {
		font-size: 1rem;
	}
}

@media screen and (max-width: 800px) {
	h1 {
		font-size: 1.04rem;
		letter-spacing: 0.1vw;
		font-weight: 600;
	}
}

.producers {
	font-size: 15px;
	font-weight: 300;
	letter-spacing: 0.07em;
	font-style: italic;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
</style>

<style scoped>
.page {
	width: 100vw;
	display: flex;
	align-items: center;
	flex-direction: column;
}

.title {
	width: 300px;
}

.gen-space {
	display: inline-block;
	height: 1px;
	width: 6px;
}

.layout {
	max-width: 1000px;
	width: 90%;
	/* display: flex; */
	/* flex-direction: column; */
}

header {
	position: sticky;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1;
	background-color: rgba(var(--bg-rgb), 0.95);
	max-width: 1000px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 25px;
	flex-wrap: wrap;
	padding-top: 10px;
}

nav {
	padding-bottom: var(--standard-spacing);
}

nav a {
	font-size: 1.1rem;
}

nav > *:not(:last-child) {
	margin-right: calc(var(--standard-spacing) * 4);
}

.nav__link {
	white-space: nowrap;
	color: inherit;
	text-decoration: none;
}

.selected {
	border-bottom: 2px solid var(--text-color);
}

@media screen and (max-width: 800px) {
	header {
		/* align-items: center; */
		justify-content: center;
		margin-bottom: 10px;
	}

	nav {
		margin-top: 10px;
	}
}

@media screen and (max-width: 325px) {
	nav * {
		font-size: 0.8em;
	}
}
</style>
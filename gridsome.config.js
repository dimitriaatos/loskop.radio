// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const i18n = require('./plugins/i18n')
require('dotenv').config()

const getAPIData = (slug, name) => {
	return {
		use: 'gridsome-source-rest',
		options: {
			debug: true,
			axiosConfig: undefined,
			endpoint: `https://cms.loskop.radio/items/${slug}`,
			typeName: name,
			isStatic: false,
			isCollection: true,
			responseInterceptor: (res) => res.data
		}
	}
}

const sitemap = {
	use: '@gridsome/plugin-sitemap',
	options: {
		exclude: [],
		config: {
			'/': {
				changefreq: 'monthly',
				priority: 0.5,
			},
			'/about': {
				changefreq: 'monthly',
				priority: 0.7,
			},
			'/shows/*' : {
				changefreq: 'monthly',
				priority: 0.7,
			},
		}
	}
}

const directus = {
	use: '@gridsome/source-graphql',
	options: {
		url: 'https://cms.loskop.radio/graphql',
		fieldName: 'directus',
		typeName: 'directusGraphQL',

		headers: {
			Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
		},
	},
}

module.exports = {
	siteName: 'Loskop',
	titleTemplate: '%s',
	siteUrl: 'https://loskop.radio',
	plugins: [
		// i18n,
		// getAPIData('shows', 'Show'),
		sitemap,
		directus,
	],
}
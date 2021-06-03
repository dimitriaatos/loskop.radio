module.exports = {
	use: 'gridsome-plugin-i18n',
	options: {
		locales: ['en', 'gr'],
		defaultLocale: 'en',
		fallbackLocale: 'en',
		pathAliases: {
			en: '',
			gr: 'gr',
		},
		messages: {
			en: require('../src/locales/en.json'),
			gr: require('../src/locales/gr.json'),
		},
	},
}
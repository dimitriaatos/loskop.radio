// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import VueAspectRatio from 'vue-aspect-ratio/src/AspectRatio.vue'
import Vuex from 'vuex'
import store from '~/store'

import PlayIcon from 'vue-material-design-icons/Play.vue'
import PauseIcon from 'vue-material-design-icons/Pause.vue'
import FileOutline from 'vue-material-design-icons/FileOutline.vue'

// import 'vue-material-design-icons/styles.css'
// import '~/assets/reset.css'

export default function (Vue, { router, head, isClient, appOptions }) {

	Vue.component('VueAspectRatio', VueAspectRatio)
	Vue.component('PlayIcon', PlayIcon)
	Vue.component('PauseIcon', PauseIcon)
	Vue.component('FileOutlineIcon', FileOutline)
	Vue.use(Vuex)
	appOptions.store = store

	// appOptions.i18n.setLocaleMessage('en', require('./locales/en.json'))
	// appOptions.i18n.setLocaleMessage('fr', require('./locales/fr.json'))

	Vue.component('Layout', DefaultLayout)
}

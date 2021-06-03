import Vue from 'vue'
import Vuex from 'vuex'
// import show from './modules/show'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state: {
		show: {
			id: '',
			title: '',
			date: '',
			slug: '',
			description: '',
			producers: [],
			artwork: '',
			audio: '',
		},
		isPlaying: false,
		sounds: [],
	},
	mutations: {
		newShow(state, show) {
			state.show = show
		},
		play(state, playState) {
			state.isPlaying = playState
		},
		sound(state, {sound, index, play}) {
			if (play) {
				return state.sounds.push(sound)
			} else {
				state.sounds.splice(index, 1)
			}
		},
	},
	actions: {
		playPause({commit, state}, show){
			const newShow = show && state.show.id != show.id
			if (newShow) commit('newShow', show)
			commit('play', newShow ? true : !state.isPlaying)
		},
		sound({commit}, options) {
			commit('sound', options)
		},
	},
	getters: {
		show: state => state.show,
		sounds: state => state.sounds,
		isThisPlaying: state => ({id}) => state.isPlaying ? state.show.id == id : false,
		isPlaying: state => {return state.isPlaying}
	},
	strict: debug,
})
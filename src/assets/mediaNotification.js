import { assets } from '~/assets/constants'

const chromeMetaAdaptor = (show) => ({
	title: show.title,
	artist: show.producers.map(({producers_id}) => `${producers_id.first_name || ''} ${producers_id.last_name || ''}`).join(', '),
	album: 'Loskop Radio',
	artwork: [
		{
			src: show.isLive ? show?.artwork?.id : assets+show?.artwork?.id,
			sizes: '512x512',
		},
	],
})

export default (meta) => {
	if ('mediaSession' in navigator) {
		navigator.mediaSession.metadata = new window.MediaMetadata(meta)
		return navigator.mediaSession
	}
}

export {
	chromeMetaAdaptor
}
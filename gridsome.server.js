// Learn more: https://gridsome.org/docs/server-api/

// const YAML = require('yaml')
const shows = require('./data_layer/shows')
const producers = require('./data_layer/producers')

module.exports = (api) => {
	// api.loadSource(async (actions) => {
	// 	const { data: { data } } = await axios.get('https://cms.loskop.radio/items/about/')
	// 	const collection = actions.addCollection('About')
	// 	collection.addNode(data)
	// })

	api.createPages(async ({ graphql, createPage }) => {

		await shows({ graphql, createPage })
		await producers({ graphql, createPage })

		// const generative = await graphql(`{
		// 	directus {
		// 		items {
		// 			generative {
		// 				pieces
		// 			}
		// 		}
		// 	}
		// }`)

		// const pieces = generative.data.directus.items.generative.pieces.map(({piece}) => YAML.parse(piece)[0])

		// api.loadSource(actions => {
		// 	const piecesCollection = actions.addCollection({
		// 		typeName: 'pieces'
		// 	})

		// 	pieces.forEach(piece => {
		// 		piecesCollection.addNode(piece)
		// 	})
		// })

	})
}
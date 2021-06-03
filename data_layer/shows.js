module.exports = async ({ graphql, createPage }) => {
	const shows = await graphql(`{
		directus {
			items {
				shows {
					id
					slug
					title
					description
					artwork {
						id
					}
					audio {
						id
						duration
					}
					date
					attachment {
						id
					}
					producers {
						producers_id {
							id
							first_name
							last_name
							slug
						}
					}
				}
			}
		}
	}`)
	shows.data.directus.items.shows.forEach((show) => {
		console.log(show.title)
		createPage({
			path: `/shows/${show.slug}`,
			component: './src/templates/Show.vue',
			context: {
				...show,
			}
		})
	})
}
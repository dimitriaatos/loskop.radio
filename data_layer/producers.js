module.exports = async ({ graphql, createPage }) => {
	const producers = await graphql(`{
		directus {
			items {
				producers {
					id
					slug
					first_name
					last_name
					description
					avatar {
						id
					}
					shows {
						shows_id {
							id
							title
							date
							slug
							audio {
								id
							}
							artwork {
								id
							}
							producers {
								producers_id {
									first_name
									last_name
									slug
									id
								}
							}
						}
					}
				}
			}
		}
	}`)

	producers.data.directus.items.producers.forEach((producer) => {
		createPage({
			path: `/producers/${producer.slug}/`,
			component: './src/templates/Producer.vue',
			context: {
				...producer,
			}
		})
	})
}
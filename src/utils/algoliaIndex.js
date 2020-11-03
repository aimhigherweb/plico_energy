const indexName = `pages`,
	pageQuery = `{
		pages: allStoryblokEntry(
			filter: {
				field_component: {
					in: ["news", "landing_page"]
				}
			}
		) {
			edges {
				node {
					name
					id
					content
				}
			}
		}
	}`;

function pageToAlgoliaRecord({
	node: {
		name, id, content
	}
}) {
	return {
		objectID: id,
		name,
		...JSON.parse(content)
	};
}

const queries = [
	{
		query: pageQuery,
		transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
		indexName,
		settings: { attributesToSnippet: [`excerpt:20`] },
	},
];

module.exports = queries;

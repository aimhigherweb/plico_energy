const indexName = `pages`,
	pageQuery = `{
		pages: allStoryblokEntry(
			filter: {
				field_component: {
					in: ["news", "landing_page", "pages", "testimonials", "faqs"]
				}
			}
		) {
			edges {
				node {
					name
					id
					content
					full_slug
					slug
					field_component
				}
			}
		}
	}`;

function pageToAlgoliaRecord({
	node: {
		name, id, content, slug, field_component
	}
}) {
	let path;

	switch (field_component) {
		case `news`:
			path = `/news/${slug}`;
			break;
		case `faqs`:
			path = `/faq/\${slug}`;
			break;
		case `testimonials`:
			path = `/testimonials`;
			break;
		default:
			path = `/${slug}`;
			break;
	}

	if (field_component === `landing_page` && slug === `home`) {
		path = `/`;
	}

	return {
		objectID: id,
		name,
		slug: path,
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

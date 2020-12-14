const pageQuery = `{
		pages: allStoryblokEntry(
			filter: {
				field_component: {
					in: ["news", "landing_page", "page", "testimonials", "faq", "categories", "faq_page", "news_page"]
				}
				full_slug: {regex: "/((landing-pages)|(news)|(testimonials)|(pages)|(faq_categories)|(custom-pages)|(faqs))\/(?!campaigns)/"}
			}
		) {
			edges {
				node {
					name
					id
					slug
					field_component
					fields {
						content {
							content
							quote
							name
							location
							banner {
								main_quote
								sub_quote
								additional_quote
								cta_button {
									cta_text
								}
							}
							body {
								heading
								sub_heading
								content
								cta_button {
									cta_text
								}
								cta_text
								media {
									content
								}
								sections {
									heading
									content
									collapsed_heading
									collapsed_content
									cta {
										cta_text
									}
								}
								plans {
									cta {
										cta_text
									}
									description
									features
									callout
									name
									price
								}
								table {
									thead {
										value
									}
									tbody {
										body {
											value
										}
									}
								}
								profiles {
									role
									name
									bio
									linkedin
								}
							}
						}
					}
				}
			}
		}
	}`,
	faqQuery = `{
		pages: allStoryblokEntry(
			filter: {
				field_component: {
					in: ["faqs"]
				}
			}
		) {
			edges {
				node {
					name
					id
					slug
					fields {
						content {
							content
						}
					}
				}
			}
		}
	}`,
	newsQuery = `{
		pages: allStoryblokEntry(
			filter: {
				field_component: {
					in: ["news"]
				}
			}
		) {
			edges {
				node {
					name
					id
					slug
					fields {
						content {
							content
						}
					}
				}
			}
		}
	}`;

function pageToAlgoliaRecord({
	node: {
		name, id, slug, field_component, fields
	}
}) {
	let path;

	switch (field_component) {
		case `news`:
			path = `/news/${slug}`;
			break;
		case `faqs`:
			path = `/faq/${slug}`;
			break;
		case `testimonials`:
			path = `/testimonials`;
			break;
		case `faq_categories`:
			path = `/faq/${slug}`;
			break;
		case `faq_page`:
			path = `/faq`;
			break;
		case `news_page`:
			path = `/news`;
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
		component: field_component,
		...fields
	};
}

const queries = [
	{
		query: pageQuery,
		transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
		indexName: `all`,
		settings: { attributesToSnippet: [`*:100`] }
	},
	{
		query: newsQuery,
		transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
		indexName: `news`,
		settings: { attributesToSnippet: [`*:100`] }
	},
	{
		query: faqQuery,
		transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
		indexName: `faq`,
		settings: { attributesToSnippet: [`*:100`] }
	},
];

module.exports = queries;

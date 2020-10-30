const path = require(`path`);

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions;

	return graphql(`
			{
				landingPages: allStoryblokEntry(filter: {field_component: {eq: "landing_page"}}) {
					edges {
						node {
							name
							slug
							full_slug
						}
					}
				}
			}
		`)
		.then((result) => {
			if (result.errors) {
				// eslint-disable-next-line no-console
				result.errors.forEach((e) => console.error(e.toString()));
				return Promise.reject(result.errors);
			}

			const { data } = result;

			data.landingPages.edges.forEach((page) => {
				let { slug } = page.node;
				if (RegExp(/home/).test(slug)) {
					slug = `/`;
				}

				createPage({
					path: slug,
					component: path.resolve(`src/templates/landingPage.js`),
					context: {
						id: page.node.id,
						slug: page.node.full_slug
					}
				});
			});
		});
};

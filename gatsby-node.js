const path = require(`path`),
	remark = require(`remark`),
	remarkHtml = require(`remark-html`),
	remarkLint = require(`remark-preset-lint-recommended`),
	strip = require(`strip-markdown`);

const processMarkdown = (markdown) => remark().use(remarkLint).use(remarkHtml).processSync(markdown)
		.toString(),
	createExcerpt = (markdown) => remark().use(strip).processSync(markdown).toString()
		.substring(0, 250);

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
				posts: allStoryblokEntry(filter: {field_component: {eq: "news"}}) {
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
		// eslint-disable-next-line consistent-return
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

			data.posts.edges.forEach((page) => {
				const { slug } = page.node;
				createPage({
					path: `/news/${slug}`,
					component: path.resolve(`src/templates/post.js`),
					context: {
						id: page.node.id,
						slug: page.node.full_slug
					}
				});
			});
		});
};

exports.onCreateNode = async ({
	node, actions
}) => {
	const { createNodeField } = actions;

	if ([`StoryblokEntry`].includes(node.internal.type)) {
		const content = JSON.parse(node.content);

		// if (node.name == `Home`) {
		// 	content.body.forEach((sec) => {
		// 		console.log(sec.cta_button);
		// 	});
		// }

		content.exerpt = createExcerpt(content.content);
		content.content = processMarkdown(content.content);

		createNodeField({
			name: `content`,
			node,
			value: content,
		});
	}
};

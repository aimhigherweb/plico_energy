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
				news: allStoryblokEntry(filter: {field_component: {eq: "news"}}) {
					edges {
						node {
							name
							slug
							full_slug
						}
					}
				}
				faqs: allStoryblokEntry(filter: {field_component: {eq: "faq"}}) {
					edges {
						node {
							name
							slug
							full_slug
						}
					}
				}
				faq_categories: allStoryblokEntry(filter: {field_component: {eq: "categories"}}) {
					edges {
						node {
							name
							slug
							full_slug
						}
					}
				}
				pages: allStoryblokEntry(filter: {field_component: {eq: "page"}}) {
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

			data.news.edges.forEach((page) => {
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

			data.faqs.edges.forEach((page) => {
				const { slug } = page.node;
				createPage({
					path: `/faqs/${slug}`,
					component: path.resolve(`src/templates/faq.js`),
					context: {
						id: page.node.id,
						slug: page.node.full_slug
					}
				});
			});

			data.faq_categories.edges.forEach((page) => {
				const { slug } = page.node;
				createPage({
					path: `/faqs/${slug}`,
					component: path.resolve(`src/templates/faq_category.js`),
					context: {
						id: page.node.id,
						slug: page.node.full_slug
					}
				});
			});

			data.pages.edges.forEach((page) => {
				const { slug } = page.node;
				createPage({
					path: `/${slug}`,
					component: path.resolve(`src/templates/page.js`),
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

		content.excerpt = createExcerpt(content.content);
		content.content = processMarkdown(content.content);

		if (node.field_component === `landing_page`) {
			const blocks = [],
				banners = [];

			content.banner.forEach((block) => {
				if (block.sub_quote) {
					banners.push({
						...block,
						sub_quote: processMarkdown(block.sub_quote)
					});
				} else {
					banners.push(block);
				}
			});

			content.body.forEach((block) => {
				const blockContent = block;
				if (block.content) {
					blockContent.content = processMarkdown(block.content);
				}
				if (block.plans) {
					blockContent.plans.forEach((plan, index) => {
						plan.features = processMarkdown(plan.features);
					});
				}

				blocks.push(blockContent);
			});

			content.body = blocks;
			content.banner = banners;
		}

		createNodeField({
			name: `content`,
			node,
			value: content,
		});
	}
};

const path = require(`path`),
	remark = require(`remark`),
	remarkHtml = require(`remark-html`),
	remarkLint = require(`remark-preset-lint-recommended`),
	strip = require(`strip-markdown`),
	generateSlug = require(`./src/utils/generateSlug`);

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
							uuid
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
				tags: allStoryblokTag {
					edges {
						node {
							name
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
						slug: page.node.full_slug,
						category: page.node.name,
						categoryFilter: `/${page.node.uuid}/g`
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

			data.tags.edges.forEach((page) => {
				createPage({
					path: `/news/${generateSlug(page.node.name)}`,
					component: path.resolve(`src/templates/news_category.js`),
					context: {
						tag: page.node.name,
						tagFilter: `/${page.node.name}/g`
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
				if (block.media && block.media[0] && block.media[0].content) {
					blockContent.media[0].content = processMarkdown(block.media[0].content);
				}
				if (block.sections) {
					block.sections.forEach((section) => {
						section.content = processMarkdown(section.content);
					});
				}

				blocks.push(blockContent);
			});

			content.body = blocks;
			content.banner = banners;
		}

		if (node.field_component === `form`) {
			const fields = [];

			content.fields.forEach((field) => {
				const fieldContent = field;

				if (field.content) {
					fieldContent.content = processMarkdown(field.content);
				}

				if (field.description) {
					fieldContent.description = processMarkdown(field.description);
				}

				if (field.fields) {
					const f2_fields = [];

					field.fields.forEach((f2) => {
						const f2_content = f2;

						if (f2.content) {
							f2_content.content = processMarkdown(f2.content);
						}

						if (f2.description) {
							f2_content.description = processMarkdown(f2.description);
						}

						if (f2.fields) {
							const f3_fields = [];

							f2.fields.forEach((f3) => {
								const f3_content = f3;

								if (f3.content) {
									f3_content.content = processMarkdown(f3.content);
								}

								if (f3.description) {
									f3_content.description = processMarkdown(f3.description);
								}

								f3_fields.push(f3_content);
							});

							f2_content.fields = f3_fields;
						}

						f2_fields.push(f2_content);
					});

					fieldContent.fields = f2_fields;
				}

				fields.push(fieldContent);
			});
			content.fields = fields;
		}

		createNodeField({
			name: `content`,
			node,
			value: content,
		});
	}
};

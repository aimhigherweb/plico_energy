const path = require(`path`),
	generateSlug = require(`./src/utils/generateSlug`),
	{ createRemoteFileNode } = require(`gatsby-source-filesystem`),
	resizeImage = require(`./src/utils/resizeImage`),
	{ processMarkdown, createExcerpt } = require(`./src/utils/markdown`);

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

				if (RegExp(/templates/).test(page.node.full_slug)) {
					return;
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

				if (RegExp(/templates/).test(page.node.full_slug)) {
					return;
				}

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

				if (RegExp(/templates/).test(page.node.full_slug)) {
					return;
				}

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

				if (RegExp(/templates/).test(page.node.full_slug)) {
					return;
				}

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

				if (RegExp(/templates/).test(page.node.full_slug)) {
					return;
				}

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
				if (RegExp(/templates/).test(page.node.full_slug)) {
					return;
				}

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
	node, actions, store, cache, createNodeId
}) => {
	const { createNodeField, createNode } = actions;

	if ([`StoryblokEntry`].includes(node.internal.type)) {
		const content = JSON.parse(node.content);

		content.excerpt = `${createExcerpt(content.content)}...`;
		content.content = processMarkdown(content.content);

		if (content.meta) {
			for (const meta in content.meta) {
				if (content.meta[meta] == ``) {
					content.meta[meta] = null;
				}
			  }
		}

		if (content.banner) {
			const banners = [];

			content.banner.forEach(async (block) => {
				const medias = [];
				block.media.forEach(async (media) => {
					let bannerImage = {},
						fileNode;

					const image = media.image.filename,
						{ component } = media;

					if (image) {
						let dimensions = [3000, 3000 * 0.49];

						if (component === `video`) {
							dimensions = [700, 700 * 0.5625];
						} else if (component === `image_blob`) {
							dimensions = [700, 700 * 0.84];
						} else if (component === `graphic`) {
							dimensions = [500, 500];
						}

						const url = resizeImage(image, dimensions);

						fileNode = await createRemoteFileNode({
							url,
							parentNode: node.id,
							createNode,
							createNodeId,
							cache,
							store,
						});
					}

					if (fileNode) {
						bannerImage = { featureImage___NODE: fileNode.id };
					}

					medias.push({
						...media,
						...bannerImage
					});
				});

				if (block.sub_quote) {
					banners.push({
						...block,
						media: medias,
						sub_quote: processMarkdown(block.sub_quote)
					});
				} else {
					banners.push({
						...block,
						media: medias
					});
				}
			});

			content.banner = banners;
		}

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

			content.body.forEach(async (block, index) => {
				const blockContent = block,
					medias = [];

				if (block.content) {
					blockContent.content = processMarkdown(block.content);
				}
				if (block.plans) {
					blockContent.plans.forEach((plan, index) => {
						plan.features = processMarkdown(plan.features);
					});
				}

				if (block.media) {
					block.media.forEach(async (media) => {
						let mediaImage = {},
							mediaContent = {},
							fileNode,
							image = false;

						if (media && media.image && media.image.filename && media.image.filename !== ``) {
							image = media.image.filename;
						}

						const { component } = media;

						if (image) {
							let dimensions = [500, 500 * 0.48];

							if (component === `video`) {
								dimensions = [700, 700 * 0.5625];
							} else if (component === `graphic`) {
								dimensions = [500, 0];
							} else if (component === `image_blob`) {
								dimensions = [500, 500 * 0.58];
							}

							const url = resizeImage(image, dimensions);

							fileNode = await createRemoteFileNode({
								url,
								parentNode: node.id,
								createNode,
								createNodeId,
								cache,
								store,
							});
						}

						if (fileNode) {
							mediaImage = { featureImage___NODE: fileNode.id };
						}

						if (media.content) {
							mediaContent = {
								content: processMarkdown(media.content)
							};
						}

						medias.push({
							...media,
							...mediaContent,
							...mediaImage
						});
					});

					blockContent.media = medias;
				}

				if (block.videos) {
					block.videos.forEach(async (video) => {
						let fileNode = { id: null },
							image = false;

						if (video.image && video.image.filename && video.image.filename !== ``) {
							image = video.image.filename;
						}

						if (image) {
							const dimensions = [300, 300 * 0.8],
								url = resizeImage(image, dimensions);

							fileNode = await createRemoteFileNode({
								url,
								parentNode: node.id,
								createNode,
								createNodeId,
								cache,
								store,
							});
						}

						video.featureImage___NODE = fileNode.id;
					});
				}

				if (block.sections) {
					block.sections.forEach(async (section) => {
						let fileNode,
							image = false;

						if (section.image && section.image.filename && section.image.filename !== ``) {
							image = section.image.filename;
						}

						if (image) {
							const dimensions = [300, 300 * 0.8],
								url = resizeImage(image, dimensions);

							fileNode = await createRemoteFileNode({
								url,
								parentNode: node.id,
								createNode,
								createNodeId,
								cache,
								store,
							});
						}

						if (fileNode) {
							section.featureImage___NODE = fileNode.id;
						}

						section.content = processMarkdown(section.content);
					});
				}

				if (block.profiles) {
					block.profiles.forEach(async (profile) => {
						let fileNode,
							image = false;

						if (profile.image && profile.image.filename && profile.image.filename !== ``) {
							image = profile.image.filename;
						}

						if (image) {
							const dimensions = [300, 400],
								url = resizeImage(image, dimensions);

							fileNode = await createRemoteFileNode({
								url,
								parentNode: node.id,
								createNode,
								createNodeId,
								cache,
								store,
							});
						}

						if (fileNode) {
							profile.featureImage___NODE = fileNode.id;
						}

						profile.bio = processMarkdown(profile.bio);
					});
				}

				if (block.logos) {
					block.logos.forEach(async (logo) => {
						let fileNode,
							image = false;

						if (logo.filename && logo.filename !== ``) {
							image = logo.filename;
						}

						if (image) {
							const dimensions = [200, 0],
								url = resizeImage(image, dimensions);

							fileNode = await createRemoteFileNode({
								url,
								parentNode: node.id,
								createNode,
								createNodeId,
								cache,
								store,
							});
						}

						if (fileNode) {
							logo.featureImage___NODE = fileNode.id;
						}
					});
				}

				blocks.push({
					...blockContent,
					nextBlock: content.body[index + 1] && content.body[index + 1].component,
					previousBlock: content.body[index - 1] && content.body[index - 1].component,
				});
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

		if ([`faq`, `news`, `testimonials`].includes(node.field_component)) {
			let dimensions = [300, 300 * 0.8],
				image = content.feature_image && content.feature_image.filename;

			if (!image || image == ``) {
				image = `https://a.storyblok.com/f/96172/4000x2667/899dd3fb21/sun_in_jar.jpg`;
			}

			if (node.field_component === `testimonials`) {
				dimensions = [200, 200];
			}

			const url = resizeImage(image, dimensions),
				fileNode = await createRemoteFileNode({
					url,
					parentNode: node.id,
					createNode,
					createNodeId,
					cache,
					store,
				});

			if (fileNode) {
				content.featureImage___NODE = fileNode.id;
			}
		}

		if (node.full_slug === `details`) {
			const image = content.logo && content.logo.filename,
				url = resizeImage(image, [200, 0]),
				fileNode = await createRemoteFileNode({
					url,
					parentNode: node.id,
					createNode,
					createNodeId,
					cache,
					store,
				});

			if (fileNode) {
				content.siteLogo___NODE = fileNode.id;
			}
		}

		createNodeField({
			name: `content`,
			node,
			value: content,
		});
	}
};

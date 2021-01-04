const remark = require(`remark`),
	remarkHtml = require(`remark-html`),
	remarkLint = require(`remark-preset-lint-recommended`),
	strip = require(`strip-markdown`),
	slug = require(`remark-slug`),
	headings = require(`remark-autolink-headings`);

const processMarkdown = (markdown) => remark()
		.use(remarkLint)
		.use(slug)
		// .use(headings)
		.use(remarkHtml)
		.processSync(markdown)
		.toString(),

	stripMarkdown = (markdown) => remark().use(strip).processSync(markdown).toString(),

	createExcerpt = (markdown) => stripMarkdown(markdown).substring(0, 250);

module.exports = {
	processMarkdown, createExcerpt, stripMarkdown
};

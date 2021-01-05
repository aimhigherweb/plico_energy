import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/partials/layout';

const FAQ = ({ data }) => {
	const {
			name,
			fields,
			slug
		} = data.storyblokEntry,
		{ content, meta } = fields.content,
		categories = data.categories.edges,
		metadata = {
			...meta,
			name: `${name} | FAQs`,
			slug: `/faqs/${slug}`
		};

	return (
		<Layout {...{
			classes: `page faq`,
			meta: metadata
		}}>
			<h1 className="title">{name}</h1>
			<div className="faq_content" dangerouslySetInnerHTML={{ __html: content }} />
			<h2>Have a different question?</h2>
			<ul className="cta_buttons categories">
				{categories.map(({ node }) => (
					<li>
						<Link to={`/faqs/${node.slug}`} className="btn">{node.name} FAQs</Link>
					</li>
				))}
			</ul>
		</Layout>
	);
};

export default FAQ;

export const pageQuery = graphql`
	query faqBySlug($slug: String!) {
		storyblokEntry(full_slug: {eq: $slug}) {
			name
			slug
			fields {
				content {
					content
					meta {
						description
						og_description
						og_image
						og_title
						title
						twitter_description
						twitter_image
						twitter_title
					}
				}
			}
		}
		categories: allStoryblokEntry(filter: {field_component: {eq: "categories"}}) {
			edges {
				node {
					name
					slug
					fields {
						content {
							content
						}
					}
				}
			}
		}
	}
`;

import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';

import Layout from '../components/partials/layout';

const FAQ = ({ data }) => {
	const {
			name,
			fields
		} = data.storyblokEntry,
		{ content } = fields.content,
		categories = data.categories.edges;

	return (
		<Layout {...{ classes: `page faq` }}>
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
			fields {
				content {
					content
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

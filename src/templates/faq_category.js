import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/partials/layout';
import News from '../components/parts/news';

const FAQCategory = ({ data }) => {
	const {
			name
		} = data.storyblokEntry,
		faqs = data.faqs.edges,
		categories = data.categories.edges;

	return (
		<Layout {...{ classes: `page faq category` }}>
			<h1>{name} FAQs</h1>
			<div className="faqs">
				{faqs.map(({ node }) => (
					<News
						key={node.name}
						{...{
							...node,
							...node.fields.content,
							slug: `/faqs/${node.slug}`,
							feature_image: false,
							cta: [{
								cta_link: `/faqs/${node.slug}`,
								cta_text: `Read More`,
								cta_colour: {
									colour: `#00BBD4`
								}
							}]
						}}
					/>
				))}
			</div>
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

export default FAQCategory;

export const pageQuery = graphql`
	query faqCategoryBySlug($slug: String!, $categoryFilter: String!) {
		storyblokEntry(full_slug: {eq: $slug}) {
			name
		}
		faqs: allStoryblokEntry(
			filter: {
				fields: {
					content: {
						category: {
							regex: $categoryFilter
						}
					}
				}
			}, 
			limit: 100
		) {
			edges {
				node {
					name
					uuid
					slug
					fields {
						content {
							content
							excerpt
							category
						}
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

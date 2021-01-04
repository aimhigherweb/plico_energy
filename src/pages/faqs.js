import React from 'react';
import { graphql } from 'gatsby';

import FAQsBlock from '../components/blocks/faqs';
import ContentBlock from '../components/parts/content_block';

import Layout from '../components/partials/layout';

import '../styles/custom/faq.scss';

const FAQPage = ({ data }) => {
	const {
			slug,
			fields,
			name
		} = data.storyblokEntry,
		categories = data.categories.edges,
		{ featured_faqs } = fields.content;

	return (
		<Layout {...{ classes: `page faq` }}>
			<h1>{name}</h1>
			<div className="featured_sections">
				{categories.map(({ node }) => (
					<ContentBlock
						key={node.name}
						{...{
							heading: node.name,
							content: node.fields.content.content,
							cta: [{
								cta_link: `/faqs/${node.slug}`,
								cta_text: `See FAQs`,
								cta_colour: {
									colour: `#00BBD4`
								}
							}]
						}}
					/>
				))}
			</div>
			<FAQsBlock {...{ ...featured_faqs[0] }} />
		</Layout>
	);
};

export default FAQPage;

export const pageQuery = graphql`
	query {
		storyblokEntry(full_slug: {eq: "custom-pages/faqs"}) {
			name
			slug
			fields {
				content {
					featured_faqs {
						faqs
						heading
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

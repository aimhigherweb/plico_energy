import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/partials/layout';
import Banner from '../components/blocks/banner';
import Form from '../components/parts/form';

const Post = ({ data }) => {
	const {
			name,
			fields
		} = data.storyblokEntry,
		{ content, featureImage, form } = fields.content;

	return (
		<Layout {...{ classes: `page news_article header_image` }}>
			<Banner
				{...{
					main_quote: name,
					media: [{
						featureImage,
						component: `image`,
					}]
				}}
			/>
			<h1 className="hidden">{name}</h1>
			<div dangerouslySetInnerHTML={{ __html: content }} />
			{form && <Form form={form} />}
		</Layout>
	);
};

export default Post;

export const pageQuery = graphql`
	query postBySlug($slug: String!) {
		storyblokEntry(full_slug: {eq: $slug}) {
			name
			fields {
				content {
					content
					featureImage {
						image: childImageSharp {
							fluid(maxWidth: 3000) {
								...GatsbyImageSharpFluid_withWebp
							}
						}
					}
					form
				}
			}
		}
	}
`;

import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/partials/layout';
import Form from '../components/parts/form';

const Page = ({ data }) => {
	const {
			name
		} = data.storyblokEntry,
		{ content, form, meta } = data.storyblokEntry.fields.content;

	return (
		<Layout {...{ classes: `page`, meta }}>
			<h1>{name}</h1>
			<div dangerouslySetInnerHTML={{ __html: content }} />
			{form && <Form form={form} />}
		</Layout>
	);
};

export default Page;

export const pageQuery = graphql`
	query pageBySlug($slug: String!) {
		storyblokEntry(full_slug: {eq: $slug}) {
			name
			fields {
				content {
					content
					form
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
	}
`;

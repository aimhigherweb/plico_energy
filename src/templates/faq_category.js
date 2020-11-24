import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';

import Layout from '../components/partials/layout';

const FAQCategory = ({ data }) => {
	const {
		name
	} = data.storyblokEntry;

	return (
		<Layout>
			<h1>{name}</h1>
		</Layout>
	);
};

export default FAQCategory;

export const pageQuery = graphql`
	query faqCategoryBySlug($slug: String!) {
		storyblokEntry(full_slug: {eq: $slug}) {
			name
		}
	}
`;

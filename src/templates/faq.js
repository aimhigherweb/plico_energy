import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';

import Layout from '../components/partials/layout';

const FAQ = ({ data }) => {
	const {
		name
	} = data.storyblokEntry;

	return (
		<Layout>
			<h1>{name}</h1>
		</Layout>
	);
};

export default FAQ;

export const pageQuery = graphql`
	query faqBySlug($slug: String!) {
		storyblokEntry(full_slug: {eq: $slug}) {
			name
		}
	}
`;

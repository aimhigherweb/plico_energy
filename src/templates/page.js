import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';

import Layout from '../components/partials/layout';

const Page = ({ data }) => {
	const {
		name
	} = data.storyblokEntry;

	return (
		<Layout>
			<h1>{name}</h1>
		</Layout>
	);
};

export default Page;

export const pageQuery = graphql`
	query pageBySlug($slug: String!) {
		storyblokEntry(full_slug: {eq: $slug}) {
			name
		}
	}
`;

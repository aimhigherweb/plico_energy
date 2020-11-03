import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';

import Layout from '../components/partials/layout';

const LandingPage = ({ data }) => {
	const {
		name
	} = data.storyblokEntry;

	return (
		<Layout>
			<h1>{name}</h1>
		</Layout>
	);
};

export default LandingPage;

export const pageQuery = graphql`
	query postBySlug($slug: String!) {
		storyblokEntry(full_slug: {eq: $slug}) {
			name
		}
	}
`;

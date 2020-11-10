import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';

import Layout from '../components/partials/layout';

const LandingPage = ({ data }) => {
	const {
		name,
		slug
	} = data.storyblokEntry;

	return (
		<Layout {...{ classes: slug }}>
			<h1>{name}</h1>
		</Layout>
	);
};

export default LandingPage;

export const pageQuery = graphql`
	query LandingPage($slug: String!) {
		storyblokEntry(full_slug: {eq: $slug}) {
			name
			field_og_image_string
			slug
		}
	}
`;

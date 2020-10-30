import React from 'react';
import { graphql } from 'gatsby';

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
	query LandingPage($slug: String!) {
		storyblokEntry(full_slug: {eq: $slug}) {
			name
		}
	}
`;

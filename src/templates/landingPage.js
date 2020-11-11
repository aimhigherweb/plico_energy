import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';

import Block from '../components/blocks';

import Layout from '../components/partials/layout';

const LandingPage = ({ data }) => {
	const {
			name,
			slug,
			fields
		} = data.storyblokEntry,
		blocks = fields.content.body;

	return (
		<Layout {...{ classes: slug }}>
			{blocks.map((block) => <Block key={JSON.stringify(block)} {...{ component: block.component, data: block }} />)}
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
			fields {
				content {
					body {
						component
						main_quote
						sub_quote
						heading
						content
						cta_button {
							cta_link
							cta_text
						}
						image {
							filename
						}
						video {
							video_url
							video_overlay {
								filename
							}
						}
						testimonials
					}
				}
			}
		}
	}
`;

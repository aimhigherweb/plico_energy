import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';

import Block from '../components/blocks';
import Banner from '../components/blocks/banner';

import Layout from '../components/partials/layout';

const LandingPage = ({ data }) => {
	const {
			slug,
			fields
		} = data.storyblokEntry,
		{ body, banner } = fields.content,
		headerType = banner[0]?.media[0].component || `default`,

		 block = body[0];

	return (
		<Layout {...{ classes: `${slug} header_${headerType}` }}>
			{/* {banner[0] && <Banner {...banner[0]} />} */}
			<div style={{
				borderTop: `5px solid rebeccapurple`,
				borderBottom: `5px solid rebeccapurple`,
				padding: `1px 0`,
			}}>
				<Block
					{...{ component: block.component, data: block }}
				/>
			</div>

			{/* {body.map((block) => (
				<Block
					key={JSON.stringify(block)}
					{...{ component: block.component, data: block }}
				/>
			))} */}
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
					banner {
						main_quote
						sub_quote
						media {
							component
							image {
								filename
							}
							video_url
						}
						cta_button {
							cta_link
							cta_text
							cta_colour {
								colour
							}
						}
					}
					body {
						component
						heading
						sub_heading
						content
						cta_button {
							cta_link
							cta_text
							cta_colour {
								colour
							}
						}
						media {
							component
							image {
								filename
							}
							video_url
							position
						}
						testimonials
						faqs
						illustration {
							illustration
							component
						}
						illustration_selection
						background
						background_colour {
							colour
						}
						form
						slider_heading
						slider_disclaimer
						results_text
						results_cta {
							cta_link
							cta_text
							cta_colour {
								colour
							}
						}
						sections {
							content
							heading
							component
						}
					}
				}
			}
		}
	}
`;

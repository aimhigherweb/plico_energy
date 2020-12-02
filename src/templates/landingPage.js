import React from 'react';
import { graphql } from 'gatsby';

import Block from '../components/blocks';
import Banner from '../components/blocks/banner';

import Layout from '../components/partials/layout';

const LandingPage = ({ data }) => {
	const {
			name,
			slug,
			fields
		} = data.storyblokEntry,
		{ body, banner, meta } = fields.content,
		headerType = banner[0]?.media[0].component || `default`,
		noBanner = !banner[0];

	return (
		<Layout {...{ classes: `${slug} header_${headerType}`, meta }}>
			<h1 className={noBanner ? `landing` : `hidden`}>{name}</h1>
			{banner[0] && <Banner {...banner[0]} />}
			{body.map((block) => (
				<Block
					key={JSON.stringify(block)}
					{...{ component: block.component, data: block }}
				/>
			))}
		</Layout>
	);
};

export default LandingPage;

export const pageQuery = graphql`
	query LandingPage($slug: String!) {
		storyblokEntry(full_slug: {eq: $slug}) {
			name
			slug
			fields {
				content {
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
					banner {
						main_quote
						sub_quote
						additional_quote
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
						_uid
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
						cta_link
						cta_text
						cta_colour {
							colour
						}
						media {
							component
							image {
								filename
							}
							video_url
							position
							content
							illustration
							heading
						}
						image {
							filename
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
							_uid
							content
							heading
							component
							collapsed_heading
							collapsed_content
							cta {
								cta_link
								cta_text
								cta_colour {
									colour
								}
							}
							image {
								filename
							}
						}
						disclaimer
						plans {
							cta {
								cta_text
								cta_link
								cta_colour {
									colour
								}
							}
							description
							features
							name
							price
						}
						table {
							thead {
								value
							}
							tbody {
								body {
									value
								}
							}
						}
						logos {
							filename
						}
						videos {
							image {
								filename
							}
							video_url
						}
						profiles {
							role
							name
							bio
							linkedin
							image {
								filename
							}
						}
					}
				}
			}
		}
	}
`;

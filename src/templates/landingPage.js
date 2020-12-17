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
		noBanner = !banner[0],
		metadata = {
			...meta,
			name,
			slug
		};

	return (
		<Layout {...{ classes: `${slug}_page header_${headerType}`, meta: metadata }}>
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
							featureImage {
								image: childImageSharp {
									fluid(maxWidth: 3000) {
										...GatsbyImageSharpFluid_withWebp
										src
									}
								}
								graphic: childImageSharp {
									fluid(maxWidth: 700) {
										...GatsbyImageSharpFluid_withWebp
										src
									}
								}
								svg: childInlineSvg {
									content
								}
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
						nextBlock
						previousBlock
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
						sticky
						cta_link
						cta_text
						cta_colour {
							colour
						}
						media {
							component
							featureImage {
								url
								image: childImageSharp {
									fluid(maxWidth: 500) {
										...GatsbyImageSharpFluid_withWebp
										src
									}
								}
								graphic: childImageSharp {
									fluid(maxWidth: 700) {
										...GatsbyImageSharpFluid_withWebp
										src
									}
								}
								video: childImageSharp {
									fluid(maxWidth: 1000) {
										...GatsbyImageSharpFluid_withWebp
										src
									}
								}
							}
							video_url
							position
							content
							illustration
							heading
						}
						testimonials
						faqs
						image {
							filename
						}
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
							featureImage {
								childImageSharp {
									fluid(maxWidth: 300) {
										...GatsbyImageSharpFluid_withWebp
									}
								}
								svg: childInlineSvg {
									content
								}
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
							callout
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
							featureImage {
								url
								childImageSharp {
									fixed(width: 200) {
										...GatsbyImageSharpFixed_withWebp
									}
									id
								}
							}
						}
						videos {
							featureImage {
								childImageSharp {
									fluid(maxWidth: 500) {
										...GatsbyImageSharpFluid_withWebp
									}
								}
							}
							video_url
						}
						profiles {
							role
							name
							bio
							linkedin
							featureImage {
								url
								childImageSharp {
									fluid(maxWidth: 300) {
										...GatsbyImageSharpFluid_withWebp
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

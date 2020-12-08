import React from 'react';
import { graphql } from 'gatsby';

import TestimonialsBlock from '../components/blocks/testimonials';
import ContentBlock from '../components/blocks/content';
import Video from '../components/parts/video';
import ContentBox from '../components/blocks/content_box';
import FormBlock from '../components/blocks/form';

import Layout from '../components/partials/layout';

import '../styles/custom/testimonials.scss';

const TestimonialsPage = ({ data }) => {
	const {
			slug,
			fields,
			name
		} = data.storyblokEntry,
		{
			component, heading, content, intro, testimonials, featured_video, videos, content_box, form_block
		} = fields.content;

	return (
		<Layout {...{ classes: `testimonials_page` }}>
			<ContentBlock {...intro[0]} />
			<TestimonialsBlock {...testimonials[0]} />
			<ContentBlock {...featured_video[0]} />
			<div className="videos">
				{videos.map((video) => (
					<Video key={video.video_url} {...video} />
				))}
			</div>
			<ContentBox {...content_box[0]} />
			<FormBlock {...form_block[0]} />
		</Layout>
	);
};

export default TestimonialsPage;

export const pageQuery = graphql`
	query {
		storyblokEntry(full_slug: {eq: "custom-pages/testimonials"}) {
			name
			field_og_image_string
			slug
			fields {
				content {
					component
					heading
					content
					intro {
						component
						heading
						content
						media {
							component
							featureImage {
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
						}
					}
					testimonials {
						heading
						content
						testimonials
					}
					featured_video {
						component
						heading
						content
						illustration {
							illustration
							component
						}
						background
						background_colour {
							colour
						}
						media {
							component
							featureImage {
								childImageSharp {
									fluid(maxWidth: 1000) {
										...GatsbyImageSharpFluid_withWebp
									}
								}
							}
							video_url
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
					content_box {
						component
						heading
						content
						cta_button {
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
						}
					}
					form_block {
						content
						heading
						form
						illustration {
							component
							illustration
						}
					}
				}
			}
		}
	}
`;

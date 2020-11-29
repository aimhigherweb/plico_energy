import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';

import FAQsBlock from '../components/blocks/faqs';
import TestimonialsBlock from '../components/blocks/testimonials';
import ContentBlock from '../components/blocks/content';
import Video from '../components/parts/video';
import ContentBox from '../components/blocks/content_box';
import FormBlock from '../components/blocks/form';

import Layout from '../components/partials/layout';

import '../styles/custom/faq.scss';

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
		<Layout {...{ classes: `page testimonials_page` }}>
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
							image {
								filename
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
						media {
							component
							image {
								filename
							}
							video_url
						}
					}
					videos {
						image {
							filename
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
						image {
							filename
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

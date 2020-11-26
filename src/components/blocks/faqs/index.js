import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import Block from "../../parts/block";
import Curve from '../../../img/blob_video.svg';
import News from '../../parts/news';
import Plug from '../../../img/animations/plug.svg';
import Animated from '../../parts/animated_svg';

import './style.scss';

const FAQsBlock = ({
	heading, content, faqs
}) => (
	<StaticQuery
		query={graphql`
			query {
				data: allStoryblokEntry(
					filter: {
						field_component: {eq: "faq"}
					}
				) {
					edges {
						node {
							name
							uuid
							slug
							fields {
								content {
									feature_image {
										filename
									}
									excerpt
								}
							}
						}
					}
				}
			}

		`}
		render={({ data }) => {
			const featured = data.edges.filter(({ node }) => faqs.includes(node.uuid));

			return (
				<Block className="faq_block">
					<Curve className="curve" />
					<Animated className="plug" position="top">
						<Plug />
					</Animated>
					<h2>{heading}</h2>
					<div dangerouslySetInnerHTML={{ __html: content }} />
					{featured.map(({ node }) => (
						<News
							key={node.name}
							{...{ ...node, ...node.fields.content, slug: `/faqs/${node.slug}` }}
						/>
					))}
				</Block>
			);
		}}
	/>
);

export default FAQsBlock;

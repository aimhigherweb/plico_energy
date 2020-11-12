import React from 'react';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';
import { StaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

import Block from "../../parts/block";
import News from '../../parts/news';
import Curve from '../../../img/blob_lightbulb.svg';

import './style.scss';

const LatestNews = ({
	heading
}) => (
	<StaticQuery
		query={graphql`
			query {
				news: allStoryblokEntry(
					filter: {
						field_component: {eq: "news"}
					}, 
					limit: 3
				) {
					edges {
						node {
							name
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
		render={({ news }) => (
			<Block className="news">
				<Curve className="curve" />
				<h2>{heading}</h2>
				{news.edges.map(({ node }) => (
					<News key={node.name} {...{ ...node, ...node.fields.content }} />
				))}
			</Block>
		)}
	/>
);

export default LatestNews;

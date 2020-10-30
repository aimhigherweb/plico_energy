import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { getFixedGatsbyImage } from 'gatsby-storyblok-image';
import SVG from 'react-inlinesvg';

import './style.scss';

const Footer = () => (
	<StaticQuery
		query={graphql`
			query {
				site: storyblokEntry(full_slug: {eq: "details"}) {
					fields {
						content {
							logo {
								filename
							}
							site_title
						}
					}
				}
			}
		`}

		render={(data) => (
			<footer>
				{data.site.fields.content.site_title}
				<SVG src={data.site.fields.content.logo.filename} />
			</footer>
		)}
	/>
);

export default Footer;

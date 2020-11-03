import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Menu from '../legal_menu';

import './style.scss';

const Copyright = () => (
	<StaticQuery
		query={graphql`
		query {
			site: storyblokEntry(full_slug: {eq: "details"}) {
					fields {
						content {
							site_title
						}
					}
				}
		}
	`}
		render={({ site }) => (
			<div className="legal">
				<p className="copyright">© {new Date().getFullYear()} {site.fields.content.site_title}. All rights reserved.</p>
				<Menu />
				<p className="tagline">Powering the Community</p>
			</div>
		)}
	/>
);

export default Copyright;

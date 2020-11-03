import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import SVG from 'react-inlinesvg';

import Menu from '../main_menu';

const Header = () => (
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
							phone
							email
						}
					}
				}
			}
		`}
		render={({ site }) => (
			<header>
				<Link to="/"><SVG src={site.fields.content.logo.filename} /></Link>
				<Menu />
			</header>
		)}
	/>
);

export default Header;

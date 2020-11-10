import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import SVG from 'react-inlinesvg';

import Menu from '../menus/main';

import Curve from '../../../img/header.svg';

import './style.scss';

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
				<Curve className="curve" />
				<Link className="logo" to="/"><SVG src={site.fields.content.logo.filename} /></Link>
				<Menu />
			</header>
		)}
	/>
);

export default Header;

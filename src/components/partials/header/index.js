import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

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
							siteLogo {
								childInlineSvg {
									content
								}
							}
						}
					}
				}
			}
		`}
		render={({ site }) => (
			<header>
				<Curve className="curve" />
				<Link className="logo" to="/" dangerouslySetInnerHTML={{ __html: site.fields.content.siteLogo.childInlineSvg.content }}>
				</Link>
				<Menu />
			</header>
		)}
	/>
);

export default Header;

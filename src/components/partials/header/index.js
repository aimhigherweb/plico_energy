import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import Menu from '../../menu';

const Header = () => (
	<StaticQuery
		query={graphql`
			query {
				site {
					siteMetadata {
						title
					}
				}
			}
		`}
		render={(data) => (
			<header>
				<Link to="/">Plico Home</Link>
				<Menu />
			</header>
		)}
	/>
);

export default Header;

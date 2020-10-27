import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

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
			</header>
		)}
	/>
);

export default Header;

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Logo from '../../../img/logo.svg';

import './style.scss';

const Footer = () => (
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
			<footer>
				<Logo/>
			</footer>
		)}
	/>
);

export default Footer;

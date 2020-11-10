import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import SVG from 'react-inlinesvg';

import Copyright from './copyright';
import Menu from '../menus/footer';
import Address from '../../parts/address';
import Social from '../../parts/social';

import Phone from '../../../img/phone.svg';
import Mail from '../../../img/mail.svg';
import Curve from '../../../img/footer.svg';

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
							phone
							email
						}
					}
				}
			}
		`}

		render={({ site }) => (
			<footer>
				<div className="container">
					<Curve className="curve" />
					<Link to="/">
						<SVG className="logo" src={site.fields.content.logo.filename} />
					</Link>
					<h2>More Plico Info</h2>
					<Menu />
					<h2>Contact Us</h2>
					<Address />
					<p><a href={`tel:${site.fields.content.phone}`}>
						<Phone />{site.fields.content.phone}
					</a></p>
					<p><a href={`mailto:${site.fields.content.email}`}>
						<Mail />{site.fields.content.email}
					</a></p>
					<Social />
				</div>
				<Copyright />
			</footer>
		)}
	/>
);

export default Footer;

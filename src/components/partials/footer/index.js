import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import SVG from 'react-inlinesvg';

import Copyright from './copyright';
import Menu from '../menus/footer';
import Address from '../../parts/address';
import Social from '../../parts/social';
import Animated from '../../parts/animated_svg';

import Plug from '../../../img/animations/plug_footer.svg';
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
							siteLogo {
								childInlineSvg {
									content
								}
							}
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
					<Link className="logo" to="/" dangerouslySetInnerHTML={{ __html: site.fields.content.siteLogo.childInlineSvg.content }}>
					</Link>
					<Animated className="plug">
						<Plug />
					</Animated>
					<section>
						<h2>More Plico Info</h2>
						<Menu />
					</section>
					<section className="contact">
						<h2>Contact Us</h2>
						<Address />
						<ul className="details">
							<li><a href={`tel:${site.fields.content.phone}`}>
								<Phone />
								<span>{site.fields.content.phone}</span>
							</a></li>
							<li><a href={`mailto:${site.fields.content.email}`}>
								<Mail />
								<span>{site.fields.content.email}</span>
							</a></li>
						</ul>

						<Social />
					</section>
				</div>
				<Copyright />
			</footer>
		)}
	/>
);

export default Footer;

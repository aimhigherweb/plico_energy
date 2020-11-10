import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import A from '../../../parts/link';
import Search from '../../search';
import Burger from '../../../../img/hamburger.svg';

import './style.scss';

const Menu = () => (
	<StaticQuery
		query={graphql`
			query {
				menu: storyblokEntry(full_slug: {eq: "menus/main"}) {
					fields {
						content {
							menu_items {
								label
								url
							}
						}
					}
				}
				cta: storyblokEntry(full_slug: {eq: "details"}) {
					fields {
						content {
							cta_buttons {
								label
								url
							}
						}
					}
				}
			}
		`}
		render={({ menu, cta }) => {
			const [open, setOpen] = useState(false),
				toggleMenu = () => {
					setOpen(!open);
				};

			return (
				<nav className="main" open={open}>
					<button onClick={toggleMenu} className="hamburger">
						<Burger/>
						<span>Toggle Hamburger Menu</span>
					</button>
					<ul className="items">
						{menu.fields.content.menu_items.map((link) => (
							<li key={JSON.stringify(link)}>
								<A {...link}>{link.label}</A>
							</li>
						))}
						<li className="search">
							<Search />
						</li>
						{cta.fields.content.cta_buttons.map((link) => (
							<li key={JSON.stringify(link)}>
								<A className="cta" {...link}>{link.label}</A>
							</li>
						))}
					</ul>
				</nav>
			);
		}}
	/>
);

export default Menu;

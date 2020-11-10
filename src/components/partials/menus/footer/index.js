import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import A from '../../../parts/link';

import './style.scss';

const Menu = () => (
	<StaticQuery
		query={graphql`
			query {
				menu: storyblokEntry(full_slug: {eq: "menus/footer"}) {
					fields {
						content {
							menu_items {
								label
								url
							}
						}
					}
				}
			}
		`}
		render={({ menu }) => (
			<nav className="footer-nav">
				<ul>
					{menu.fields.content.menu_items.map((link) => (
						<li key={JSON.stringify(link)}>
							<A {...link}>{link.label}</A>
						</li>
					))}
				</ul>
			</nav>
		)}
	/>
);

export default Menu;

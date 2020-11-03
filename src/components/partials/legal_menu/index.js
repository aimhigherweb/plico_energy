import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import A from '../../parts/link';

const Menu = () => (
	<StaticQuery
		query={graphql`
			query {
				menu: storyblokEntry(full_slug: {eq: "menus/legal"}) {
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
			<nav>
				<ul>
					{menu.fields.content.menu_items.map((link) => (
						<li>
							<A {...link} />
						</li>
					))}
				</ul>
			</nav>
		)}
	/>
);

export default Menu;

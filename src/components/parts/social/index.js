import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import A from '../link';

const Social = () => (
	<StaticQuery
		query={graphql`
			query {
				menu: storyblokEntry(full_slug: {eq: "menus/social"}) {
					fields {
						content {
							menu_items {
								label
								url
								icon {
									filename
								}
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

export default Social;

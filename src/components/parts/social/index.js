import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import SVG from 'react-inlinesvg';

import A from '../link';

import './style.scss';

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
			<nav className="social">
				<ul>
					{menu.fields.content.menu_items.map((link) => (
						<li key={JSON.stringify(link)}>
							<A {...link}>
								<SVG src={link.icon.filename} />
								{link.label}
							</A>
						</li>
					))}
				</ul>
			</nav>
		)}
	/>
);

export default Social;
